import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';
import {useState} from 'react'

// REQUIRES PROPS OF USESTATE 'SELECTEDITEMS'

const Item = (props) => {

    const selectItem = (item) => {
        // No unselect feature
        props.setSelectedItems([item.key]);
    }
    
    return (
        <TouchableOpacity 
        onPress={() => selectItem(props.item)}
        activeOpacity={1}
        >
            <View style={{
                flex: 1
            }}
            >
                <View style={[styles.WeekButtonDeselected,
                        props.selectedItems.includes(props.item.key) && styles.WeekButtonSelected]}>
                    <Text style={[styles.WeekButtonH1,
                        props.selectedItems.includes(props.item.key) && styles.WeekButtonTextSelected]}>{props.item.week}
                    </Text>
                    <Text style={[styles.WeekButtonH2,
                        props.selectedItems.includes(props.item.key) && styles.WeekButtonTextSelected]}>{props.item.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        
    );
}

const WeekPicker = (props) => {

    const [weekPicked, setWeekPicked] = useState(["1"]);
    // const weekData = () => {

    //     const today = new Date();
        
    //     const getWeek = (i) => {

    //         // need to get startDate and endDate from today

    //         // use date functions bc months/years
    //         const endDate = ['CALCULATION HERE', 'CALCULATION HERE']
    //         return (startDate.getMonth +  "/" + startDate.getDay) +
    //             (' - ') +
    //             (endDate[0] +  "/" + endDate[1]);
        

    //     // fix this for last week
    //     const data =  [["This Week", getWeek(date)], ["Last Week", getWeek(date)]];

    //     // should make dyanmic to database data
    //     for (var i = 2; i < 5; i++) {
    //         data = [...data, [i + ' Weeks Ago', getWeek(i)]]
    //     }

    //     return data
    //     }

    // }
    const weekData2 = 
    [
    {
        "key": "1",
        "week": "This Week",
        "description": "6/13 - 6/19"
    },
    {
        "key": "2",
        "week": "Last Week",
        "description": "6/06 - 6/12"
    },
    {
        "key": "3",
        "week": "2 Weeks Ago",
        "description": "5/31 - 6/05"
    },
    {
        "key": "4",
        "week": "3 Weeks Ago",
        "description": "5/24 - 5/30"
    },
    ]
    
    // [["This Week", "ABC"], ["This Week", "ABC"], ["This Week", "ABC"]];


        return (
        <View 
        style={{
            marginHorizontal: 8,
        }}
        >
            <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            // style={{backgroundColor:'#ccc'}}
            >
                <FlatList 
                data={weekData2}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} selectedItems={weekPicked} setSelectedItems={setWeekPicked}></Item>
                    )
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                horizontal
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    WeekButtonDeselected: {
        backgroundColor: '#FBFBFB',
        width: 104,
        height: 72,
        // width: '18%',
        // height: '11%',
        borderWidth: 1.5,
        borderColor: '#E9EAE4',
        borderRadius: 30,
        marginHorizontal: 6,
    },
    WeekButtonSelected: {
        backgroundColor:'#7637FE',
        borderColor: '#7637FE',
    },
    WeekButtonH1: {
        // padding: '10%',
        paddingTop: "15%",
        paddingBottom: "5%",
        textAlign: 'center',
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    WeekButtonH2: {
        fontSize: 13,
        textAlign: 'center',
    },
    WeekButtonTextSelected: {
        color: '#fff',
    }
})

export default WeekPicker