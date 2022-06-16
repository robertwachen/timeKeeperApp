import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';

const CalendarSection = (props) => {
    if (props.type == 'top') 
    {
        return (
            <View style={styles.calendarEventTop}>
            </View>
        )
    }
    else if (props.type == "middleTop")
    {
        return (
            <View style={styles.calendarEventMiddleTop}>
            </View>
        )
    }
    else if (props.type == "middleBottom")
    {
        return (
            <View style={styles.calendarEventMiddleBottom}>
            </View>
        )
    }
    else if (props.type == "bottom")
    {
        return (
            <View style={styles.calendarEventBottom     }>
            </View>
        )
    }
    return (
        <View></View>
    )
}

const CalendarHour = (props) => {
    const [categoriesOpened, setCategoriesOpened] = useState([]);

    // represents when the time starts/ends
    // const sectionsActivated = [true, true, true, true]

    /*
        Filter all logs to an array of logs for that hour
        Send them to the calendarsections
    */

    const thisHoursLogs = () => {
        for (var log in props.data) {
            var obj = props.data[log];
            // console.log(obj)
            /*
                needs some serious Date() work
            */
            if (obj["category"] == props.item.category)
            {
                    result = obj['hours'];
            }
        }
    }

    return (
        <View style={{
            flex: 1, flexDirection: 'row', 
            // backgroundColor: '#eee', borderBottomColor: '#000', borderBottomWidth: 4
        }}>
            {/* This is for left side timestamps*/}
            <View style={{width: 56}}>
                <View style={{justifyContent: 'flex-end', alignItems:'center'}}>
                    <Text>{props.hour} {props.AMPM}</Text>
                </View>
            </View>

            {/* This is for gridlines and calendar */}
            <View style={{flex: 1}}>

            {/* This is for events */}
            {/* <View style={styles.calendarEventTop}>
            </View>
            <View style={styles.calendarEventMiddleTop}>
                <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>Prep</Text>
            </View>
            <View style={styles.calendarEventMiddleBottom}>
            </View>
            <View style={styles.calendarEventBottom}>
            </View> */}
            <CalendarSection type="top"></CalendarSection>

            {/* Horizontal Lines */}
            <View>
                <View
                style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    height: 36,
                }}
                />
                <View
                style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    height: 36,
                }}
                />
                <View
                style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    height: 36,
                }}
                />
                <View
                style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    height: 36,
                }}
                />
            </View>

            {/* Vertical line */}
            <View
                style={{
                    borderLeftColor: '#CCCCCC',
                    borderLeftWidth: 1,
                    width: 10,
                    height: "100%",
                    zIndex: 1,
                    position: 'absolute',
                    left: 16,
                }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
      fontSize: 24,
      color: '#033acc',
      textAlign: 'center',
      fontWeight: '600',
    },
    h2: {
      fontSize: 18,
      color: '#212629',
      textAlign: 'center',
      fontWeight: '600',
    },
    calendarEventTop: {
        backgroundColor: '#E63EF5',
        width: 116,
        height: 35,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        top: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarEventMiddleTop: {
        backgroundColor: '#E63EF5',
        width: 116,
        height: 35,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        top: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarEventMiddleBottom: {
        backgroundColor: '#E63EF5',
        width: 116,
        height: 35,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        top: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarEventBottom: {
        backgroundColor: '#E63EF5',
        width: 116,
        height: 31,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        top: 105,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
  })    

export default CalendarHour