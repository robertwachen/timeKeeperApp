import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';
import { firebase, auth } from '../config';
import { getDatabase, ref, set, update, onValue, push, remove } from "firebase/database";

TouchableOpacity.defaultProps = {...(TouchableOpacity.defaultProps || {}), delayPressIn: 0};


function roundbyFifteen (number) {
    console.log(number)
    if (number == 0)
    {
        return '00'
    }
    else if (number < 15) 
    {
        return 15
    } 
    else if (number > 15 && number < 30)
    {
        return 30
    }
    else if (number > 30 && number < 45)
    {
        return 45
    }
    else if (number > 45)
    {
        return 59
    }
    return number
}

// const getSelectedItems = (item) => selectedItems.includes(item.key);

const SubCategory = (props) => {
    const db = getDatabase();

    console.log('\nasdnsaio39', props)

    const getColor = () => {
        var result = categoryData.filter(obj => { return obj.name == props.selectedItems[0]})[0]['color']
        console.log('sdniqsow9', result)
        return result
    }

    const setSubCategory = () => {
        // Sets it locally
        props.setSelectedItems([props.selectedItems[0], props.item])
        console.log('891nuo')

        // Pushes to database

        var data = props.data

        var endDateFromFirebase = ''

        var noDateFound = true;


        for (var log in data) {
            var obj = data[log];

            // Max date so it only matters for date split
            // This matters because the useState updates asynchronously so it won't catch the match
            const currentDateState = '9999-99-99T99:99:99Z'

            // accounts for the log spliting over two different days
            if (new Date(props.bubbleSelected).getUTCDate() < new Date(obj['startDate']).getUTCDate())
            {
                var newDate = new Date(obj['startDate'])
                console.log('//')
                console.log(newDate)
                console.log('true!!sa', newDate.toISOString(), newDate.getUTCFullYear(),
                newDate.getUTCMonth(), newDate.getUTCDate())

                var newDay = newDate.getUTCDate()
                if (newDay < 10)
                {
                    newDay = '0' + newDay
                }

                var newMonth = newDate.getUTCMonth() + 1
                if (newMonth < 10)
                {
                    newMonth = '0' + newMonth
                }

                const newDateString = newDate.getUTCFullYear() + '-' + newMonth + '-' +
                    newDay + "T00:00:00.000Z"

                console.log(newDateString +'///')
                props.setBubbleSelected(newDateString)
                currentDateState = newDateString
            }

            // figure out how to do the comparison
            console.log(obj['startDate'], props.bubbleSelected)

            if (obj['startDate'] == props.bubbleSelected || 
                obj['startDate'] == currentDateState) 
            {
                console.log('Match!')
                noDateFound = false;
                oldLog = data[log]
                oldLogID = data[log]['logID']

                const addTime = function (startDate, time) {
                    startDate.setMinutes(startDate.getMinutes() + time);
                    return startDate;
                };
                
                endDateFromFirebase = new Date(data[log]['endDate'])
                endDateFromFirebase = addTime(endDateFromFirebase, endDateFromFirebase.getTimezoneOffset())

                const updates = {}

                console.log(JSON.stringify(oldLog), 'dsaioq')
            
                const newUpdate = {
                    // these two need to be converted to UTC time
                    startDate: data[log]['trueUTCStartDate'],
                    endDate: endDateFromFirebase,

                    category: oldLog['category'],

                    // this is the change
                    subCategory: props.item,
                };

                var logPath ='/users/' + auth.currentUser.uid + '/logs/'
                logPath += oldLogID

                updates[logPath] = newUpdate;
                
                console.log('subcat update bef', new Date().toISOString())
                update(ref(db), updates);
                console.log('subcat update aft', new Date().toISOString())

                // fixes db timing issues       
                // const updateSynchronously = async () => {
                //     const updatesPushed = await update(ref(db), updates);
                // }

                // updateSynchronously()
            }
        }

        // this means it's a new entry and the DB hasn't updated yet
        if (noDateFound)
        {
            // await/promise stuff
        }
        
        console.log('done\n\n')
    }

    const isSubCategorySelected = () => {
        if (props.selectedItems[1] == props.item)
        {
            return true
        }
        else 
        {
            return false
        }
    }

    return (
        <TouchableOpacity 
            style={{
            marginBottom: 8,
            }}
            onPress={setSubCategory}
            activeOpacity={1}
        >
            <View style={
                    [
                        styles.subCategory, 
                        isSubCategorySelected() ?
                        {backgroundColor: getColor(), color: '#fff'}
                        :
                        {borderColor: getColor(), borderWidth: 1}
                    ]
                }>
                <Text style={
                    [
                        {
                        fontSize: 16, 
                        marginLeft: 8,
                        }, 
                        isSubCategorySelected() ?
                        {color: '#fff'}
                        :
                        {color: '#000'}
                ]}>
                {props.item}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Item = (props) => {

    const db = getDatabase();

    function addLog(userId, newLog) {
        
        // const updates = {};
        // updates['/users/1/logs'] = newLog;

        // // set(ref(db, 'users/' + userId), {
        // //   logs: [newLog],
        // // });
        // push(ref(db, 'users/' + userId + '/logs'), newLog);


        const postListRef = ref(db, 'users/' + userId + '/logs');
        const newPostRef = push(postListRef);
        set(newPostRef, newLog);


        
        // console.log('new log added!')
    }

    function parseISOString(s) {
        var b = s.split(/\D+/);
        // console.log('parsing! ' + s + ' ' + b)
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }

    const getLastDate = () => {
        var d1, d2;

        var data = {}
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/'), (snapshot) => {
            data = snapshot.val();
        });

        const logData = () => {
            var result = []

            // console.log(data['logs'])
            for (var log in data['logs']) {
                // console.log("\nlog" + log)
                var obj = data['logs'][log];
                // {
                //     "category": data['logs'][log]['category'],
                //     "endDate": data['logs'][log]['endDate'],
                //     "startDate": data['logs'][log]['startDate'],
                //     "subCategory": data['logs'][log]['subCategory'],
                // }
                // console.log("\nobj" + obj['category'])
                result = [...result, obj]
                // console.log("\nresult" + result)
            }
            // for (var log in props.data) {
            //     var obj = props.data[log];
            //     // console.log(obj)
            //     /*
            //         needs some serious Date() work
            //     */
            //     if (obj["category"] == props.item.category)
            //     {
            //             result = obj['hours'];
            //     }
            // }
            
            return result
        }
        

        console.log("*****************DASDSJA*()")
        // console.log(logData())

        var logs = logData();
        // console.log(logs[0]['endDate'])
        if (true)
        {

            // THIS NEEDS TO BE DYNAMIC
            logs = [{
                category: 'Body',
                startDate: '2022-06-15T00:00:00.000Z',
                endDate: '2022-06-26T02:00:00.000Z',
                subCategory: 'Uncategorized'
            }]
        }
        console.log('logs', JSON.stringify(logs))

        var result = logs[0]['endDate']
        // console.log(result)
        // console.log('----------------')

        // console.log('logs!!' + logs)

        logs.forEach((log) => {
            // console.log(log['endDate'])
            // console.log('result' + result)
            // d1 = parseISOString(JSON.stringify(result));
            // console.log(d1)
            // d2 = parseISOString(JSON.stringify(log['endDate']))
            // console.log('d1: ' + d1 + ' d2: ' + JSON.stringify(d2))
            // console.log('log ' + log['endDate'])
            if (log['endDate'] > result)
            {
                result = log['endDate'];
                // console.log('the new latest date is ' + result)
            }
            // console.log('result prevailed!')
        })
        // console.log(d1)

        // result = d1

        // console.log('LAST DATE: ' + result)
        return result;

        // return "2022-06-14T23:16:00.423Z"
    }

    // References the useState in HorizontalScrollBar
    const selectItem = (item) => {

        console.log('hellodsadniasodasinod')
        const newLog = (props) => {

            var startDate = JSON.stringify(getLastDate()).substring(1, 25);
            var endDate = JSON.stringify(new Date()).substring(1, 25);

            console.log('startdate', startDate, 'enddate', endDate)

            var startMinutes = roundbyFifteen((startDate.substring(14, 16) * 1))
            var endMinutes = roundbyFifteen((endDate.substring(14, 16) * 1))

            console.log('startmin', startMinutes, 'endmin', endMinutes)


            startDate = startDate.substring(0, 14) + startMinutes + ":00.000Z"
            endDate = endDate.substring(0, 14) + endMinutes + ":00.000Z"

            console.log('startdate', startDate, 'enddate', endDate)

            var result = {
                startDate: startDate,
                endDate: endDate,
                category: item.name,
                subCategory: 'Uncategorized',
            }

            console.log(JSON.stringify(result))
            return result
        }

        console.log('item', item)
        console.log('props.selectedItems', props.selectedItems)
        // console.log('props.selectedItemslength', props.selectedItems[0].length)

        // currently selecting this bubble, deselect it
        if (props.selectedItems[0] == item.name) {
            // console.log('\n asda' + JSON.stringify(props))
            props.setSelectedItems([]);
            props.setSubCategories([]);
            props.setBubbleSelected(props.data['endDate']);
        } 

        // change the category of a bubble
        else if (props.selectedItems.length > 0)
        {
            console.log('CATEGORY CHANGE!')
            props.setSelectedItems([item.name, 'Uncategorized']);
            props.setSubCategories(item['subCategories'])
            console.log(props.selectedItems)

            
            // gets from firebase DB
            var oldLog = []
            var oldLogID = ''
            var data = props.data
            // onValue(ref(db, 'users/1/'), (snapshot) => {
            //     data = snapshot.val();
            // });
            console.log('data', JSON.stringify(data))
            console.log('props.bubbleSelected', props.bubbleSelected)

            console.log('startingsadjsodasdpqdmio0wd1')
            for (var log in data) {
                console.log('log::::', log)
                var obj = data[log];

                console.log(obj['startDate'])
                console.log(props.bubbleSelected)
                console.log('-------------')
                if (obj['startDate'] == props.bubbleSelected) 
                {
                    console.log('match!MINONIO')
                    oldLog = data[log]
                    oldLogID = data[log]['logID']
                    console.log(oldLog)
                }
            }
            console.log('oldlog', JSON.stringify(oldLog))
            
            var oldLogStartDate = oldLog['trueUTCStartDate']
            var oldLogOldEndDate = oldLog['endDate']
            var oldLogCategory = oldLog['category']
            var oldLogSubCategory = oldLog['subCategory']

            console.log('oldlogID', oldLogID, 'oldlogenddate', oldLogOldEndDate)

            // references the position of the select category bubble using tapLocationY
            const getSelectCategoryStartDate = () => {

                /*
                    Back-propogate through the previous events to get the time the parent bubble starts
                    then add that to the taplocation Y to get the true time 

                    Back prop is done in the loop that goes through the

                    add from the local start date of the event in the first place
                */

                // intentionally in local time
                const getStartHours = () => {
                    var startHours = oldLog['startDate'].substring(11, 13) * 1
                    var startMinutes = oldLog['startDate'].substring(14, 16) / 60
                    startHours += startMinutes
                    return startHours
                }

                // for (var log in data) {
                //     var obj = data[log];

                //     // get log local date and compare it to selected date
                //     // then get the amount 
    
                //     console.log(obj['startDate'])
                //     console.log(props.bubbleSelected)
                //     console.log('-------------')
                //     if (obj['startDate'] == props.bubbleSelected) 
                //     {
                //         console.log('match!MINONIO')
                //         oldLog = data[log]
                //         oldLogID = data[log]['logID']
                //         console.log(oldLog)
                //     }
                // }

                // 35 = padding above midnight
                var startTime = '' + (((props.tapLocationY) / 36 / 4) + getStartHours())
                console.log('startTime', startTime)

                if (!startTime.includes('.'))
                {
                    startTime += '.00'
                }
                var startHours = startTime.substring(0, startTime.indexOf('.'))
                // var startMinutes = startTime.substring(startTime.indexOf('.') + 1, startTime.indexOf('.') + 3)
                var startMinutes = startTime.substring(startTime.indexOf('.') + 1)
                if (startMinutes.length == 1)
                {
                    startMinutes += 0
                }
                startMinutes = startMinutes.substring(0, 2)

                console.log(startMinutes)

                startMinutes = '' + (startMinutes * 60 / 100)

                console.log(startMinutes)

                if (startHours.length == 1)
                {
                    startHours = '0' + startHours
                }

                if (startMinutes.length == 1)
                {
                    startMinutes = '0' + startMinutes
                }

                var startDate = props.bubbleSelected.substring(0, 10)

                var result = startDate + 'T' + startHours + ':' + startMinutes + ':00.000Z'
                console.log('oldLogNewEndDate NOT CONVERTED', result)

                var resultUTC = new Date(result)
                resultUTC = new Date(resultUTC.getTime() + resultUTC.getTimezoneOffset()*60000)

                return resultUTC.toISOString()
                // var bubbleHeight = ((getMinutes(props.item['startDate'], props.item['endDate'])) / 15 * 36) - 4
            }

            var oldLogNewEndDate = getSelectCategoryStartDate();
            console.log('oldLogNewEndDate', oldLogNewEndDate)

            var logPath ='/users/' + auth.currentUser.uid + '/logs/'
            logPath += oldLogID
            console.log('logPath', logPath)

 
            //update the old log
            /*
                find the log id
                update the end date
            */
            const updates = {}
            
            const newUpdate = {
                endDate: oldLogNewEndDate,
                startDate: oldLogStartDate,
                category: oldLogCategory,
                subCategory: oldLogSubCategory,
            };
            updates[logPath] = newUpdate;
            console.log('updates', updates)

            //add a new log that fills in the time
            /*
                create a new log with the start date of the old log's new end date
                and the end date the old log's old end date
            */

            // var endDate = JSON.stringify(new Date()).substring(1, 25);

            const updateLog = () =>
            {
                var startDate = oldLogNewEndDate; // already UTC
                var endDate = oldLogOldEndDate;
        
                var startMinutes = roundbyFifteen((startDate.substring(14, 16) * 1))
                var endMinutes = roundbyFifteen((endDate.substring(14, 16) * 1))
    
                startDate = startDate.substring(0, 14) + startMinutes + ":00.000Z"
                endDate = endDate.substring(0, 14) + endMinutes + ":00.000Z"
                console.log('old end date', endDate)

                var endDateUTC = new Date(endDate)
                endDateUTC = new Date(endDateUTC.getTime() + endDateUTC.getTimezoneOffset()*60000)
        
                var result = {
                    startDate: startDate,
                    endDate: endDateUTC.toISOString(),
                    category: item.name,
                    subCategory: 'Uncategorized',
                }
    
                return result
            }
            // console.log(updateLog())

            console.log('ITS TIME TO UPDATE')
            console.log(updates)
            console.log(updateLog())

            // for everything besides 15m updates
            if (newUpdate['startDate'] != newUpdate['endDate'])
            {
                console.log('nionionio')
                update(ref(db), updates); // DB PUSH
            }

            // 15m updates, get rid of the old log
            else
            {
                console.log('dasnasiodas')
                // console.log(JSON.stringify(ref(db, logPath)))
                remove(ref(db, logPath)) // DB PUSH
                props.setBubbleSelected(null)
            }
            
            addLog(auth.currentUser.uid, updateLog()) // DB PUSH
        }

        // adding a new log
        else {
            console.log('here!')
            props.setSelectedItems([item.name, 'Uncategorized']);
            props.setSubCategories(item['subCategories'])

            // get this logs data
            props.setBubbleSelected(newLog()['startDate'])
            addLog(auth.currentUser.uid,newLog()) // DB PUSH

            // animation off/on
            // setTimeout(function () {
            //     props.setSelectedItems([]);
            // }, 500);        
        }


        // console.log(props.selectedItems[0])
        // THIS WOULD BE MULTI SELECT/DESELECT
        // if (props.selectedItems.includes(item.key)) {
        //     const newListItems = props.selectedItems.filter(itemKey => itemKey !== item.key);
        //     props.setSelectedItems(newListItems);
        // } else {
        //     props.setSelectedItems([...props.selectedItems, item.key]);
        // }
    }

    return (
        //style={({ pressed }) => [pressed ? FlatListItemPressed : FlatListItem]}
        <TouchableOpacity 
        onPress={() => selectItem(props.item)}
        activeOpacity={1}
        >
            <View style={{
                flex: 1,
            }}
            >
                <View style={{alignItems: 'center'}}>
                    <View
                    style={[styles.FlatListIconContainer, {borderColor: props.item.color}, (props.selectedItems[0] == props.item.name) && {backgroundColor: props.item.color}]}>
                        <Image 
                            source={props.item.image}
                            style={[styles.FlatListIcon, (props.selectedItems[0] == props.item.name) && styles.FlatListIconPressed]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.FlatListText,
                            (props.selectedItems[0] == props.item.name) && {color: props.item.color}]}>
                            {props.item.name}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const HorizontalScrollBar = (props) => {

    return (
        <View style={{
            marginLeft: 16,
        }}>
            {/* <ScrollView
            // horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            > */}
                <FlatList 
                data={props.categoryData}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} 
                        selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}
                        bubbleSelected={props.bubbleSelected} setBubbleSelected={props.setBubbleSelected} 
                        tapLocationY={props.tapLocationY} setTapLocationY={props.setTapLocationY}
                        absoluteTapLocationY={props.absoluteTapLocationY} setAbsoluteTapLocationY={props.setAbsoluteTapLocationY}
                        subCategories={props.subCategories} setSubCategories={props.setSubCategories}
                        data={props.data}
                        />                      
                    )
                }}
                // numColumns={Math.ceil(props.categoryData.length / 2)}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // horizontal
                />
            {/* </ScrollView> */}

            {/* subCategories */}
            <View style={{height: 16, justifyContent: 'center', marginBottom: 24}}>
                <View style={{borderColor: '#000', borderWidth: 1, borderWidth:1}}/>
            </View>
            <FlatList 
                data={props.subCategories}
                renderItem={({item, index}) => {
                    return (
                        <SubCategory item={item} index={index} 
                        selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}
                        bubbleSelected={props.bubbleSelected} setBubbleSelected={props.setBubbleSelected} 
                        data={props.data}
                        />                      
                    )
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{height: 180}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    FlatListText: {
        color: '#3B4043',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: "600"
    },
    // FlatListTextPressed: {
    //     color: '#0165EC',
    // },
    FlatListIconContainer: {
        width: 64, 
        height: 64, 
        marginHorizontal: 8,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1.5,
    },
    FlatListIcon: {
        width: 24, 
        height: 24, 
    },
    FlatListIconContainer: {
        width: 64, 
        height: 64, 
        marginHorizontal: 8,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1.5,
    },
    FlatListIconPressed: {
        tintColor:'#fff',
    },
    subCategory: {
        height: 32,
        justifyContent: 'center',
        borderRadius: 8
    },
    subCategorySelected: {
        color:'#fff',
    }
})

export default HorizontalScrollBar

/*

useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('Refreshed!');
    });
  }, [])

*/