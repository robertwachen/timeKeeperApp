import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';
import { firebase } from '../config';
import { getDatabase, ref, set, update, onValue, push } from "firebase/database";

function roundbyFifteen (number) {
    console.log(number)
    if (number < 15) 
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
        onValue(ref(db, 'users/1/'), (snapshot) => {
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
        

        // console.log("*****************DASDSJA*()")
        // console.log(logData())

        var logs = logData();
        // console.log(logs[0]['endDate'])
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
                subCategory: '',
            }

            console.log(JSON.stringify(result))
            return result
        }

        // currently selecting this bubble, deselect it
        if (props.selectedItems == item.name) {
            props.setSelectedItems([]);
        } 

        // change the category of a bubble
        else if (props.selectedItems != [])
        {
            props.setSelectedItems([item.name]);

            return; // remove when ready

            // gets from firebase DB
            var oldLog;
            var oldLogID;

            var oldLogOldEndDate = oldLog['endDate']

            // references the position of the select category bubble using tapLocationY
            const getSelectCategoryStartDate = () => {

                // 35 = padding above midnight, may be 15m rounding errors, TBD
                var startTime = (props.tapLocationY - 35) / 36

                // TODO
                var startHours, startMinutes;
                var startDate

                var result = startDate + 'T' + startHours + ':' + startMinutes + ':00.000Z'
                // var bubbleHeight = ((getMinutes(props.item['startDate'], props.item['endDate'])) / 15 * 36) - 4

            }

            var oldLogNewEndDate = getSelectCategoryStartDate();

            var logPath ='/users/1/logs/'
            logPath += 'asdnsaiodas' //TODO
 
            //update the old log
            /*
                find the log id
                update the end date
            */
            const updates = []
            
            const newUpdate = {
                endDate: oldLogNewEndDate,
                // startDate: oldLog,
                // category: item.name,
                // subCategory: '',
            };
            updates[logPath] = newUpdate;
            update(ref(db), updates);

            //add a new log that fills in the time
            /*
                create a new log with the start date of the old log's new end date
                and the end date the old log's old end date
            */

            // var endDate = JSON.stringify(new Date()).substring(1, 25);

            const updateLog = () =>
            {
                var startDate = oldLogNewEndDate;
                var endDate = oldLogOldEndDate;
        
                var startMinutes = roundbyFifteen((startDate.substring(14, 16) * 1))
                var endMinutes = roundbyFifteen((endDate.substring(14, 16) * 1))
    
                startDate = startDate.substring(0, 14) + startMinutes + ":00.000Z"
                endDate = endDate.substring(0, 14) + endMinutes + ":00.000Z"
        
                var result = {
                    startDate: startDate,
                    endDate: endDate,
                    category: item.name,
                    subCategory: '',
                }
    
                return result
            }

            addLog('1',updateLog()) 
        }

        else 
        {
            props.setSelectedItems([item.name]);
            // addLog('1',newLog())

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
            // selected={getSelectedItems(item)
            // }
            >
                {/* <Image 
                    source={props.item.image}
                    style={[styles.FlatListIcon,
                        props.selectedItems.includes(props.item.name) && styles.FlatListIconPressed]}
                /> */}
                {/* <Image 
                    source={[props.item.image, props.selectedItems.includes(props.item.name) && props.item.imageSelected]}
                    style={styles.FlatListIcon}
                /> */}
                <View style={{alignItems: 'center'}}>
                    <View
                    style={[styles.FlatListIconContainer, {borderColor: props.item.color}, props.selectedItems.includes(props.item.name) && {backgroundColor: props.item.color}]}>
                        <Image 
                            source={props.item.image}
                            style={[styles.FlatListIcon, props.selectedItems.includes(props.item.name) && styles.FlatListIconPressed]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.FlatListText,
                            props.selectedItems.includes(props.item.name) && {color: props.item.color}]}>
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