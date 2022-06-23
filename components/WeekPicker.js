import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';
import {useState} from 'react'

const Item = (props) => {
    // console.log(props)

    const selectItem = (item) => {
        // No unselect feature
        console.log('here')
        props.setWeekSelected(props.item);
        console.log(props.weekSelected)
    }

    // const getWeekTitle = () => {
    //     const todayDate = new Date()
    //     if (todayDate > new Date(props.item.begin))
    //     {
    //         console.log('asdasdmio')
    //     }
    //     return 'test'
    // }
    
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
                        props.weekSelected['title'] == props.item.title && styles.WeekButtonSelected]}>
                    <Text style={[styles.WeekButtonH1,
                        props.weekSelected['title'] == props.item.title && styles.WeekButtonTextSelected]}>{props.item.title}
                    </Text>
                    <Text style={[styles.WeekButtonH2,
                        props.weekSelected['title'] == props.item.title && styles.WeekButtonTextSelected]}>
                            {props.item.begin.substring(0, props.item.begin.length - 5)} - {props.item.end.substring(0, props.item.end.length - 5)}
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
                data={props.weeksBetweenDates}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} weekSelected={props.weekSelected} setWeekSelected={props.setWeekSelected}></Item>
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
        width: 112,
        height: 56,
        // width: '18%',
        // height: '11%',
        borderWidth: 1.5,
        borderColor: '#E9EAE4',
        borderRadius: 24,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    WeekButtonSelected: {
        backgroundColor:'#7637FE',
        borderColor: '#7637FE',
    },
    WeekButtonH1: {
        // padding: '10%',
        // paddingTop: "15%",
        // paddingBottom: "5%",
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