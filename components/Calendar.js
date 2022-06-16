import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import CalendarHour from './CalendarHour';

var lastBubbleBottomYPosition = 36;

const Event = (props) => {
    console.log('hello!!')
    console.log(props)

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
      

    const getMinutes = (d1, d2) => {

        var startDate = parseISOString(d1)
        var endDate = parseISOString(d2)
        startDate.setSeconds(0)
        endDate.setSeconds(0)
        startDate.setMilliseconds(0)
        endDate.setMilliseconds(0)

        // To calculate the time difference of two dates
        console.log(startDate.getTime() + " start date time " + startDate);
        console.log(endDate.getTime() + " end date time " + endDate);
        console.log (endDate - startDate)
        var Difference_In_Time = endDate.getTime() - startDate.getTime();

        var Difference_In_Minutes = Difference_In_Time / (1000 * 60);

        console.log(Difference_In_Time + " diff in time ");
        console.log(Difference_In_Minutes + " minutes ");

        return Difference_In_Minutes;
    }

    // TODO
    const getColor = (category) => {
        if (category == 'waste')
        {
            return '#000'
        }
        return '#000'
    }


    // const bubbleColor = getColor(props.item['category'])
    // const bubbleHeight = (getMinutes(props.item['startDate'], props.item['endDate'])) * 0.75 //this is arbitrary
    // const bubbleStartingPointY = lastBubbleBottomYPosition + 4 // arbitrary 

    const bubbleColor = '#999'
    const bubbleHeight = 100
    const bubbleStartingPointY = lastBubbleBottomYPosition // arbitrary 

    lastBubbleBottomYPosition += bubbleHeight + 4;
    console.log(bubbleStartingPointY + " " + lastBubbleBottomYPosition)

    return (
        // customize backgroundColor, height, top
        <View style={[styles.calendarEventBubble, {backgroundColor: bubbleColor, height: bubbleHeight, top: bubbleStartingPointY}]}>
            <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>title</Text>
        </View>
       )
}

const Calendar = (props) => {
    const [categoriesOpened, setCategoriesOpened] = useState([]);
    console.log('********')
    console.log(props.data['logs'])

    const logData = () => {
        var result = []
        for (var log in props.data['logs']) {
            var obj = props.data['logs'][log];
            // console.log(obj)
            result = [...result, obj]
        }
        return result
    }
    /*
        1. sort logs by time
        2. send the logs relevant to each calendar hour to that calendar hour
        3. send the log information (top/mid/bottom + color + potential text?) to the calendarsection
    */

    /*
        For each log, create a display with hard coded values
    */

    return (
        <View style={{
            flex: 1, flexDirection: 'column'
        }}>
            {/* For nav/padding, TODO */}
            <View style={{height: 64}}>
            </View>
            {/* <FlatList 
                data={props.data['logs']}
                renderItem={({item, index}) => {
                    return (
                        <CalendarHour item={item} index={index} />
                    )
                }}
            /> */}

            
            
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
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>1 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>2 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>3 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>4 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>5 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>6 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>7 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>8 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>9 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>10 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>11 AM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>12 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>1 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>2 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>3 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>4 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>5 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>6 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>7 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>8 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>9 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>10 PM</Text>
                        </View>
                        <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>11 PM</Text>
                        </View>
                    </View>


                    {/* Right side components */}
                    <View style={{flex: 1}}> 
                         {/* On-Top Components */}
                        <FlatList 
                            data={logData()}
                            renderItem={({item, index}) => {
                                return (
                                    <Event item={item} index={index}></Event>
                                )
                            }}
                            style={{zIndex: 2, position: 'absolute', width: '100%', height: '100%'}}
                        />

                        {/* Horizontal Lines + Vertical Line */}
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
                                    zIndex: 1,
                                    position: 'absolute',
                                    left: 16,
                        }}
                    />
                        </View>
                    </View>
                    

                </View>
            </ScrollView>
           
            {/* <ScrollView>
                    <CalendarHour hour={12} AMPM={'AM'} data={props.data['logs']}/>
                    <CalendarHour hour={1} AMPM={'AM'} data={props.data['logs']}/>
                    <CalendarHour hour={2} AMPM={'AM'} data={props.data['logs']}/>
                    <CalendarHour hour={3} AMPM={'AM'} data={props.data['logs']}/>
                    <CalendarHour hour={4} AMPM={'AM'} data={props.data['logs']}/>
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                    <CalendarHour />
                </ScrollView> */}
            {/* This is for left side timestamps*/}
            {/* <View style={{width: 56}}>
            <View style={{height: 76, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            <View style={{height: 108, justifyContent: 'flex-end', alignItems:'center'}}>
                <Text>5 AM</Text>
            </View>
            </View> */}

            {/* This is for gridlines and calendar */}
            <View style={{flex: 1}}>

            {/* This is for events */}
            {/* <View style={{
                backgroundColor: '#E63EF5',
                width: 116,
                height: 175,
                zIndex: 2,
                position: 'absolute',
                left: 17,
                top: 104,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>Prep</Text>
            </View>
            <View style={{
                backgroundColor: '#3EC7F5',
                width: 116,
                height: 67,
                zIndex: 2,
                position: 'absolute',
                left: 17,
                top: 284,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{fontSize:14, fontWeight:"bold", color: "#fff", textAlign:'center'}}>Eating with Friends</Text>
            </View>
            <View style={{
                backgroundColor: '#fff',
                width: 116,
                height: 71,
                zIndex: 2,
                position: 'absolute',
                left: 17,
                top: 356,
                borderRadius: 8,
                borderColor: '#000',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{fontSize:14}}>Select Category</Text>
            </View> */}

            <View style={{height: 32}}></View>
            {/* <View>
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
            </View> */}
            {/* <View
                style={{
                    borderLeftColor: '#CCCCCC',
                    borderLeftWidth: 1,
                    width: 10,
                    height: "100%",
                    zIndex: 1,
                    position: 'absolute',
                    left: 16,
                }}
                /> */}
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
    calendarEventBubble: {
        width: 116,
        zIndex: 2,
        position: 'absolute',
        left: 17,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#E63EF5',
        // width: 116,
        // height: 31,
        // zIndex: 2,
        // position: 'absolute',
        // left: 17,
        // top: 105,
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
})


export default Calendar