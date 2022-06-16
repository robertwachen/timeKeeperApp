import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import CalendarHour from './CalendarHour';

var lastBubbleBottomYPosition = 36;

const Event = (props) => {
    // console.log('hello!!')
    // console.log(props)

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
      

    // ASSUMES ITS BEING GIVEN TWO TIMES ON THE SAME DAY + 15 MINUTE INCREMENTS
    const getMinutes = (d1, d2) => {

        console.log('----')
        // console.log(d1)
        // console.log(d2)

        var startDateMinutes = d1.substring(d1.indexOf(':') + 1)
        startDateMinutes = startDateMinutes.substring(0, startDateMinutes.indexOf(':'));

        var startDateHours = d1.substring(d1.indexOf('T') + 1, d1.indexOf(':'))
        
        var endDateMinutes = d2.substring(d2.indexOf(':') + 1)
        endDateMinutes = endDateMinutes.substring(0, endDateMinutes.indexOf(':'));

        var endDateHours = d2.substring(d2.indexOf('T') + 1, d2.indexOf(':'))

        // console.log(startDateMinutes + '??+' + startDateHours)
        // console.log(endDateMinutes + '+' + endDateHours)

        var startMinutes = (startDateHours * 60) + (startDateMinutes * 1)
        var endMinutes = (endDateHours * 60) + (endDateMinutes * 1)
        // console.log(startMinutes + ' ' + endMinutes)

        

        // var startDate = parseISOString(d1)
        // var endDate = parseISOString(d2)
        // startDate.setSeconds(0)
        // endDate.setSeconds(0)
        // startDate.setMilliseconds(0)
        // endDate.setMilliseconds(0)

        // // To calculate the time difference of two dates
        // console.log(startDate.getTime() + " start date time " + startDate);
        // console.log(endDate.getTime() + " end date time " + endDate);
        // console.log (endDate - startDate)
        // var Difference_In_Time = endDate.getTime() - startDate.getTime();

        // var Difference_In_Minutes = Difference_In_Time / (1000 * 60);
        var Difference_In_Minutes = endMinutes - startMinutes;

        // console.log(Difference_In_Time + " diff in time ");
        console.log(Difference_In_Minutes + " minutes ");

        return Difference_In_Minutes;
    }

    const getColor = (category) => {
        if (category == 'Waste')
        {
            return '#CCC'
        }
        if (category == 'Prep')
        {
            return '#222'
        }
        if (category == 'School')
        {
            return '#444'
        }
        if (category == 'Eat')
        {
            return '#666'
        }
        if (category == 'Sleep')
        {
            return '#888'
        }
        if (category == 'Social')
        {
            return '#AAA'
        }
        if (category == 'Startup')
        {
            return '#ff00ff'
        }
        return '#000'
    }


    // const bubbleColor = getColor(props.item['category'])
    // const bubbleHeight = (getMinutes(props.item['startDate'], props.item['endDate'])) * 0.75 //this is arbitrary
    // const bubbleStartingPointY = lastBubbleBottomYPosition + 4 // arbitrary 

    const bubbleColor = getColor(props.item['category'])
    var bubbleHeight = ((getMinutes(props.item['startDate'], props.item['endDate'])) / 15 * 36) - 4
    const bubbleStartingPointY = lastBubbleBottomYPosition

    lastBubbleBottomYPosition += bubbleHeight + 4;
    // console.log(bubbleStartingPointY + " " + lastBubbleBottomYPosition)

    console.log(props.item)
    console.log(bubbleColor, + ' ' + bubbleHeight + ' ' + bubbleStartingPointY)

    return (
        // customize backgroundColor, height, top
        <View style={[styles.calendarEventBubble, {backgroundColor: bubbleColor, height: bubbleHeight, top: bubbleStartingPointY}]}>
            <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>{props.item['category']}</Text>
        </View>
       )
}

const Calendar = (props) => {
    const [categoriesOpened, setCategoriesOpened] = useState([]);

    console.log(JSON.stringify(props.data) + ' *** CALENDAR DATA\n\n')

    // console.log('********')
    // console.log(props.data['logs'])

    // const logData = () => {
    //     var result = []
    //     for (var log in props.data['logs']) {
    //         var obj = props.data['logs'][log];
    //         // console.log(obj)
    //         result = [...result, obj]
    //     }
    //     return result
    // }
    /*
        1. sort logs by time
        2. send the logs relevant to each calendar hour to that calendar hour
        3. send the log information (top/mid/bottom + color + potential text?) to the calendarsection
    */

    /*
        For each log, create a display with hard coded values
    */

    const getCurrentTimeHeight = () => {
        // THIS IS IN LOCAL TIME ZONE

        const todayDate = new Date()

        var result = ((todayDate.getHours() * 60) + (todayDate.getMinutes())) / 15 * 36;
        // size of the view, check to make sure thats the correct buffer
        result += 17

        // console.log(todayDate.getHours() + ': current time height')
        // console.log(todayDate.getMinutes() + ': current time height')
        // console.log(result + ': current time height')

        return result;
    }

    return (
        <View style={{
            flex: 1, flexDirection: 'column'
        }}>
            {/* For nav/padding, TODO */}
            <View style={{height: 64}}>
            </View>
          
            
            <ScrollView>

                {/* Background Times & Bars */}
                <View style={{flexDirection: 'row',
                // position: 'absolute', width: '100%', height: '100%', backgroundColor: '#ccc'
                }}>
                    {/* Left Side Times */}
                    <View style={{width: 56}}>
                        <View style={{height: 44, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>12 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>1 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>2 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>3 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>4 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>5 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>6 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>7 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>8 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>9 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>10 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>11 AM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>12 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>1 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>2 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>3 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>4 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>5 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>6 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>7 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>8 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>9 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>10 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>11 PM</Text>
                        </View>
                        <View style={{height: 144, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>12 AM</Text>
                        </View>
                        <View style={{height: 36, justifyContent: 'flex-end', alignItems:'center'}}>
                        </View>
                    </View>


                    {/* Right side components */}
                    <View style={{flex: 1}}> 
                        {/* On-Top Components */}
                        
                        <View style={{top: getCurrentTimeHeight(), zIndex: 3, justifyContent: 'center'}}>
                                <View style={{backgroundColor: '#3B4043', height: 17, width: 17, left: 8, borderRadius: 20, justifyContent: 'center'}}>
                                    <View style={{width: 115, borderBottomColor: '#3B4043', borderBottomWidth: 1, height: 1, left: 16, justifyContent: 'center'}}></View>
                                </View>
                        </View>

                        <FlatList 
                            data={props.data}
                            renderItem={({item, index}) => {
                                return (
                                    <Event item={item} index={index}></Event>
                                )
                            }}
                            style={{zIndex: 2, position: 'absolute', width: '100%', height: '100%'}}
                        />

                        {/* Horizontal Lines + Vertical Line */}
                        <View style={{zIndex: 1, position: 'absolute', width: '100%', height: '100%'}}>
                        
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
                        <View
                        style={{
                            borderBottomColor: '#CCCCCC',
                            borderBottomWidth: 1,
                            height: 36,
                        }}
                        />
                
                    

                    {/* Vertical Line */}
                        <View
                            style={{
                                        borderLeftColor: '#CCCCCC',
                                        borderLeftWidth: 1,
                                        width: 10,
                                        height: "100%",
                                        zIndex: 3,
                                        position: 'absolute',
                                        left: 16,
                            }}
                        />
                        {/* <View style={{height: 17, zIndex: 2, justifyContent: 'center', backgroundColor:'#ccc'}}>
                                <View style={{borderBottomColor: '#3B4043', borderBottomWidth: 1, height: 1, left: 16, justifyContent: 'center'}}></View>
                                <View style={{backgroundColor: '#3B4043', height: 17, width: 17, left: 8, borderRadius: 20, justifyContent: 'center'}}></View>
                        </View> */}
                        </View>

                        
                    </View>
                    

                </View>
            </ScrollView>
           
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
    calendarEventBubble: {
        width: 116,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default Calendar