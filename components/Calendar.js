import { useState, useEffect, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native-web';
import CalendarHour from './CalendarHour';
import categoryData from '../data/categoryData';
// import { TouchableOpacity } from 'react-native-gesture-handler';


var lastBubbleBottomYPosition = 36;

// const Event = (props) => {
//     // console.log('hello!!')
//     // console.log(props)

//     function parseISOString(s) {
//         var b = s.split(/\D+/);
//         return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
//       }
      

//     // ASSUMES ITS BEING GIVEN TWO TIMES ON THE SAME DAY + 15 MINUTE INCREMENTS
//     const getMinutes = (d1, d2) => {

//         console.log('----')
//         // console.log(d1)
//         // console.log(d2)

//         var startDateMinutes = d1.substring(d1.indexOf(':') + 1)
//         startDateMinutes = startDateMinutes.substring(0, startDateMinutes.indexOf(':'));

//         var startDateHours = d1.substring(d1.indexOf('T') + 1, d1.indexOf(':'))
        
//         var endDateMinutes = d2.substring(d2.indexOf(':') + 1)
//         endDateMinutes = endDateMinutes.substring(0, endDateMinutes.indexOf(':'));

//         var endDateHours = d2.substring(d2.indexOf('T') + 1, d2.indexOf(':'))

//         // console.log(startDateMinutes + '??+' + startDateHours)
//         // console.log(endDateMinutes + '+' + endDateHours)

//         var startMinutes = (startDateHours * 60) + (startDateMinutes * 1)
//         var endMinutes = (endDateHours * 60) + (endDateMinutes * 1)
//         // console.log(startMinutes + ' ' + endMinutes)

        

//         // var startDate = parseISOString(d1)
//         // var endDate = parseISOString(d2)
//         // startDate.setSeconds(0)
//         // endDate.setSeconds(0)
//         // startDate.setMilliseconds(0)
//         // endDate.setMilliseconds(0)

//         // // To calculate the time difference of two dates
//         // console.log(startDate.getTime() + " start date time " + startDate);
//         // console.log(endDate.getTime() + " end date time " + endDate);
//         // console.log (endDate - startDate)
//         // var Difference_In_Time = endDate.getTime() - startDate.getTime();

//         // var Difference_In_Minutes = Difference_In_Time / (1000 * 60);
//         var Difference_In_Minutes = endMinutes - startMinutes;

//         // console.log(Difference_In_Time + " diff in time ");
//         console.log(Difference_In_Minutes + " minutes ");

//         return Difference_In_Minutes;
//     }

//     const getColor = (category) => {
//         if (category == 'Waste')
//         {
//             return '#CCC'
//         }
//         if (category == 'Prep')
//         {
//             return '#222'
//         }
//         if (category == 'School')
//         {
//             return '#444'
//         }
//         if (category == 'Eat')
//         {
//             return '#666'
//         }
//         if (category == 'Sleep')
//         {
//             return '#888'
//         }
//         if (category == 'Social')
//         {
//             return '#AAA'
//         }
//         if (category == 'Startup')
//         {
//             return '#ff00ff'
//         }
//         return '#000'
//     }


//     // const bubbleColor = getColor(props.item['category'])
//     // const bubbleHeight = (getMinutes(props.item['startDate'], props.item['endDate'])) * 0.75 //this is arbitrary
//     // const bubbleStartingPointY = lastBubbleBottomYPosition + 4 // arbitrary 

//     const bubbleColor = getColor(props.item['category'])
//     var bubbleHeight = ((getMinutes(props.item['startDate'], props.item['endDate'])) / 15 * 36) - 4
//     const bubbleStartingPointY = lastBubbleBottomYPosition

//     lastBubbleBottomYPosition += bubbleHeight + 4;
//     // console.log(bubbleStartingPointY + " " + lastBubbleBottomYPosition)

//     console.log(props.item)
//     console.log(bubbleColor, + ' ' + bubbleHeight + ' ' + bubbleStartingPointY)

//     return (
//         // customize backgroundColor, height, top
//         <View style={[styles.calendarEventBubble, {backgroundColor: bubbleColor, height: bubbleHeight, top: bubbleStartingPointY}]}>
//             <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>{props.item['category']}</Text>
//         </View>
//        )
// }

const todaysDateArr = [new Date().toLocaleDateString(), '', '']
        todaysDateArr[1] = todaysDateArr[0].substring(todaysDateArr[0].indexOf('/') + 1)
        todaysDateArr[2] = todaysDateArr[1].substring(todaysDateArr[1].indexOf('/') + 1)
        todaysDateArr[1] = todaysDateArr[1].substring(0, todaysDateArr[1].indexOf('/'))
        todaysDateArr[0] = todaysDateArr[0].substring(0, todaysDateArr[0].indexOf('/'))

const getMinutes = (d1, d2) => {

    // console.log('----')
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
    // console.log(Difference_In_Minutes + " minutes ");

    return Difference_In_Minutes;
}

const Event = (props) => {
    // console.log('hello!!')
    // console.log(props)

    // const [tapLocationY, setTapLocationY] = useState(0)

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
      

    // ASSUMES ITS BEING GIVEN TWO TIMES ON THE SAME DAY + 15 MINUTE INCREMENTS
    

    const getColor = (category) => {
        // console.log('asdnsaiod')
        // console.log(categoryData)
        // return categoryData[category]['color'] - use when dictionary
        if (category == 'Waste')
        {
            return '#0CE40C'
        }
        if (category == 'School')
        {
            return '#F53D3D'
        }
        if (category == 'Body')
        {
            return '#F5D63D'
        }
        if (category == 'Social')
        {
            return '#0DB9F2'
        }
        if (category == 'Startup')
        {
            return '#F53DF5'
        }
        return '#000'
    }


    // const bubbleColor = getColor(props.item['category'])
    // const bubbleHeight = (getMinutes(props.item['startDate'], props.item['endDate'])) * 0.75 //this is arbitrary
    // const bubbleStartingPointY = lastBubbleBottomYPosition + 4 // arbitrary 

    // console.log(props)
    const bubbleColor = getColor(props.item['category'])
    // const bubbleColor = props.item.color
    var bubbleHeight = ((getMinutes(props.item['startDate'], props.item['endDate'])) / 15 * 36) - 4

    // useEffect(() => {
    //     props.setLastBubbleBottomYPosition(bubbleStartingPointY + bubbleHeight + 4)
    //   }, []);
    

    // setLastBubbleBottomYPosition(bubbleStartingPointY + bubbleHeight + 4)
    // lastBubbleBottomYPosition += bubbleHeight + 4;
    // console.log(bubbleStartingPointY + " " + lastBubbleBottomYPosition)

    // useEffect(() => {
    //     // console.log(props.lastBubbleBottomYPosition)
    //     // console.log(bubbleStartingPointY)
    //     // console.log(bubbleHeight)
    //     const setNewStartingPosition = () => {
    //         props.setLastBubbleBottomYPosition(bubbleStartingPointY + bubbleHeight + 4)
    //     }
    //     setNewStartingPosition();
    //     // console.log('done! :) new pos:')
    //     // console.log(props.lastBubbleBottomYPosition)
    //     // console.log('---')
    //   }, []);
    
    // console.log(props.item)
    // console.log(bubbleColor, + ' ' + bubbleHeight)


    function roundbyFifteen (number) {
        // console.log(number)
        if (number == 0)
        {
        return 0
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
   

    // const onLayout = () => {
    //     console.log("basketball");
    // }

    // const getOverrideCategoryHeight = () => {
    //     // bubbleheight - taplocation (in 15m increments)
    //     return bubbleHeight - 100
    // }
    
    // const getOverrideCategoryTop = () => {
    //     // top of element minus taplocation (in 15m increments)
    //     return tapLocationY
    // }

    const handlePress = (evt) => {
        // console.log('asdadnoqee')
        // console.log(props.bubbleSelected)
        // console.log(props.item['startDate'])
        // props.setBubbleSelected(props.item['startDate'])
        // console.log(props.bubbleSelected)

        // return

        // console.log('before touch: ')
        // console.log(props.bubbleSelected)


        // if the bubble selected is this one, deselect it
        if (props.bubbleSelected == props.item['startDate'])
        {
            props.setBubbleSelected(null)
            props.setSelectedItems([])
        }
        // if there is a bubble selected but its not this one, change the bubble selected
        // if there is no bubble selected
        else 
        {
            var relativeTapLocationY = Math.round(evt.nativeEvent.locationY / 36) * 36
            var absoluteTapLocationY = Math.round(evt.nativeEvent.pageY / 36) * 36
            props.setTapLocationY(relativeTapLocationY)
            props.setAbsoluteTapLocationY(absoluteTapLocationY)
            props.setBubbleSelected(props.item['startDate'])
            props.setSelectedItems(props.item['category'])
        }

        // // if there is a bubble selected but its not this one, change the bubble selected
        // else if (props.bubbleSelected != null)
        // {
        //     var result = Math.round(evt.nativeEvent.locationY / 36) * 36
        //     setTapLocationY(result)
        //     props.setBubbleSelected(props.item['startDate'])
        // }

        // // if there is no bubble selected
        // else if (props.bubbleSelected == null)
        // {
        //     var result = Math.round(evt.nativeEvent.locationY / 36) * 36
        //     setTapLocationY(result)
        //     props.setBubbleSelected(props.item['startDate'])
        // }

        // console.log('after touch: ')
        // console.log(props.bubbleSelected)

        // if (bubbleSelected)
        // {
        //     setBubbleSelected(false)
        // }
        // else
        // {
        //     setBubbleSelected(true)
        //     setOtherBubblesSelected(true)
        //     // make sure taplocation is in 15m increments
        //     var result = Math.round(evt.nativeEvent.locationY / 36) * 36
        //     setTapLocationY(result)
        //     console.log(tapLocationY);
        // }
        
        
        // result = ((todayDate.getHours() * 60) + (todayDate.getMinutes())) / 15 * 36;
        // console.log(roundbyFifteen(evt.nativeEvent.locationX), roundbyFifteen(evt.nativeEvent.locationY));
        // console.log(evt)
    };

    return (
        // customize backgroundColor, height, top
        <View style={{zIndex:5}}
        >
            <TouchableOpacity
            activeOpacity={1}
            onPress={(evt) => handlePress(evt)}
            >
                <View style={[styles.calendarEventBubble, {backgroundColor: bubbleColor, height: bubbleHeight, 
                // top: bubbleStartingPointY
                }]}>
                {/* this view only appears on push, shows select category */}
                {
                    (props.bubbleSelected == props.item['startDate']) ?
                    <View style={[styles.calendarOverrideEventBubble, {top: props.tapLocationY, height: bubbleHeight-props.tapLocationY, position: 'absolute'}]}>
                        <Text style={{fontSize:12, fontWeight:"bold", color: "#3B4043"}}>
                            Select Category
                        </Text>
                    </View>
                    :
                    null
                }
                <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>{props.item['category']}</Text>
                </View>
            </TouchableOpacity>
        </View>
        
       )
}

const Calendar = (props) => {
    // console.log(JSON.stringify(props) + ' *** PROPS!\n\n')
    // console.log(JSON.stringify(props.data) + ' *** CALENDAR DATA\n\n')

    //using startdate as the key
    // const [bubbleSelected, setBubbleSelected] = useState(null)

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

        // size of the view
        result += 27

        // console.log(todayDate.getHours() + ': current time height')
        // console.log(todayDate.getMinutes() + ': current time height')
        // console.log(result + ': current time height')

        return result;
    }

    // const getUnfilledTimeTop = () => {
    //     // setTimeout(() => {
    //     //     return lastBubbleBottomYPosition;;
    //     //   }, 1000);
    //     return lastBubbleBottomYPosition;
    // }

    const getUnfilledTimeHeight = () => {
        // console.log('gettging heiught')
        // console.log('date viewing: ' + props.dateViewing)
        var totalBubbleHeight = 0
        for (let event of props.data)
        {
            totalBubbleHeight += ((getMinutes(event['startDate'], event['endDate'])) / 15 * 36)
            // console.log(totalBubbleHeight)
            // console.log('asdasjsdn')
        }
        // console.log(totalBubbleHeight)
        // console.log('final asdasjsdn')
        if (isSelectedDateToday())
        {
            // console.log('cnsqio;')
            // console.log(getCurrentTimeHeight() - totalBubbleHeight)
            return getCurrentTimeHeight() - totalBubbleHeight;
        }
        else
        {
            // 3487 is the pixel height from 12 AM - 12 AM
            return 3487 - totalBubbleHeight;
        }
        // if (totalBubbleHeight != 0) {
        //     return getCurrentTimeHeight() - totalBubbleHeight;
        // }
        // else {
        //     return "98.55%"
        // }
        
    }

    const isSelectedDateToday = () => {

        const dateViewingArr = [props.dateViewing[0], props.dateViewing[1], props.dateViewing[2]]

        if (((dateViewingArr[0] * 1) == (todaysDateArr[0] * 1)) &&
            ((dateViewingArr[1] * 1) == (todaysDateArr[1] * 1)) &&
            ((dateViewingArr[2] * 1) == (todaysDateArr[2] * 1))
           )
        {
            return true
        }

        // console.log(dateViewingArr)
        // console.log(todaysDateArr)
        return false
    }

    // console.log('asdasad')
    // console.log(JSON.stringify(props.dateViewing))
    // console.log(new Date(props.dateViewing))
    // console.log(new Date().toLocaleDateString())
    // console.log(isSelectedDateToday())

    return (
        <View style={{
            flex: 1, flexDirection: 'column'
        }}>
            
          
            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentOffset={{x: 0, y: getCurrentTimeHeight() - 500}}
            >

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
                    <View style={{flex: 1,  top: 36}}> 
                        {/* On-Top Components */}

                        {/* <View style={{position:'absolute', height:100, backgroundColor: '#000',
                        borderWidth:1, borderColor:'#000', top: 71, zIndex:100}}/> */}

                        {props.data.map (
                            (item, index) => {
                                return (
                                    <Event item={item} key={index} 
                                    bubbleSelected={props.bubbleSelected} setBubbleSelected={props.setBubbleSelected} 
                                    selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}
                                    tapLocationY={props.tapLocationY} setTapLocationY={props.setTapLocationY}
                                    absoluteTapLocationY={props.absoluteTapLocationY} setAbsoluteTapLocationY={props.setAbsoluteTapLocationY}
                                    />
                                )
                            }
                        )}

                        {
                            // 29 is the space for one 15-minute block, it shows at the :01/:16/:31/:46
                            (getUnfilledTimeHeight() > 29) && (props.bubbleSelected == null) ?
                            <View style={[styles.calendarAddEventBubble, {height: getUnfilledTimeHeight()}]}>
                                <Text style={{fontSize:12, fontWeight:"bold", color: "#3B4043"}}>
                                    Select Category
                                </Text>
                            </View>
                            :
                            null
                        }
                        

                        {/* <FlatList 
                            data={props.data}
                            renderItem={({item, index}) => {
                                return (
                                    <Event item={item} index={index} lastBubbleBottomYPosition={lastBubbleBottomYPosition} setLastBubbleBottomYPosition={setLastBubbleBottomYPosition}></Event>
                                )
                            }}
                            style={{zIndex: 2, position: 'absolute', width: '100%', height: '100%'}}
                        ></FlatList> */}

                        {/* ALT COLOR: #e43e37
                        getCurrentTimeHeight()
                         */}

                         {/* Added position absolute and top to prevent the current time moving when it's filled */}
                         {
                            isSelectedDateToday() ?
                            <View style={{zIndex: 3, justifyContent: 'center', position: 'absolute', top: getCurrentTimeHeight()}}>
                                <View style={{backgroundColor: '#3B4043', height: 17, width: 17, left: 8, borderRadius: 20, justifyContent: 'center'}}>
                                    <View style={{width: 115, borderBottomColor: '#3B4043', borderBottomWidth: 1, height: 1, left: 16, justifyContent: 'center'}}></View>
                                </View>
                            </View>
                            :
                            null
                         }
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
        // position: 'absolute',
        left: 17,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        flexDirection: 'column'
    },
    calendarAddEventBubble: {
        width: 116,
        zIndex: 3,
        // position: 'absolute',
        left: 17,
        borderRadius: 8,
        borderColor: '#3B4043',
        borderWidth: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarOverrideEventBubble: {
        width: 116,
        zIndex: 3,
        borderRadius: 8,
        borderColor: '#3B4043',
        borderWidth: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'flex-start'
    }
})


export default Calendar