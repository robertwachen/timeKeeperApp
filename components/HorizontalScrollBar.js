import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';
import { firebase } from '../config';
import { getDatabase, ref, set, update, onValue, push } from "firebase/database";



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
        const newLog = {
            startDate: JSON.stringify(getLastDate()).substring(1, 25),
            endDate: JSON.stringify(new Date()).substring(1, 25),
            category: item.name,
            subCategory: '',
        }
        if (props.selectedItems.includes(item.name)) {
            props.setSelectedItems([]);
        } else {
            props.setSelectedItems([item.name]);
            addLog('1',newLog)
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
                flex: 1
            }}
            // selected={getSelectedItems(item)
            // }
            >
                <Image 
                    source={props.item.image}
                    style={[styles.FlatListIcon,
                        props.selectedItems.includes(props.item.name) && styles.FlatListIconPressed]}
                >
                </Image>
                <View>
                    <Text style={[styles.FlatListText,
            props.selectedItems.includes(props.item.name) && styles.FlatListTextPressed]}>{props.item.name}</Text>
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
                        <Item item={item} index={index} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}></Item>
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
        color: '#000',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    FlatListTextPressed: {
        color: '#0165EC',
    },
    FlatListIcon: {
        width: 50, 
        height: 50, 
        marginHorizontal: 10,
        marginRight: 16, 
        marginBottom: 4,
        tintColor: '#000',
    },
    FlatListIconPressed: {
        tintColor:'#0165EC',
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