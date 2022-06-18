import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HorizontalScrollBar from '../components/HorizontalScrollBar';
import categoryData from '../data/categoryData';
import TimeInput from '../components/TimeInput';

import { TouchableOpacity } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import sqlite from 'react-native-sqlite-storage';
import * as SQLite from "expo-sqlite";
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import Calendar from '../components/Calendar';
import { firebase } from '../config';
import { getDatabase, ref, set, update, onValue } from "firebase/database";

// Convert to Flatlist and render one by one so you can do usestate styling
const SingleDate = (props) => {

  const todaysDateArr = [new Date().toLocaleDateString(), '', '']
        todaysDateArr[1] = todaysDateArr[0].substring(todaysDateArr[0].indexOf('/') + 1)
        todaysDateArr[2] = todaysDateArr[1].substring(todaysDateArr[1].indexOf('/') + 1)
        todaysDateArr[1] = todaysDateArr[1].substring(0, todaysDateArr[1].indexOf('/'))
        todaysDateArr[0] = todaysDateArr[0].substring(0, todaysDateArr[0].indexOf('/'))
  const itemDate = [props.item.substring(0, props.item.indexOf('/')), '', '']
  itemDate[1] = [props.item.substring((props.item.indexOf('/') + 1), props.item.indexOf(',') - 5)]
  itemDate[2] = [props.item.substring((props.item.indexOf(',') - 4), props.item.indexOf(','))]
  const selectedDate = [new Date(props.dateViewing).toISOString().substring(5, 7), new Date(props.dateViewing).toISOString().substring(8, 10), new Date(props.dateViewing).toISOString().substring(0, 4)]
  console.log(props)
  console.log("____________++++______________")

  const isDateToday = () => {
    // console.log(todayDate[0] * 1, todayDate[1] * 1, todayDate[2] * 1)
    // console.log(itemDate[0] * 1, itemDate[1] * 1, itemDate[2] * 1)
    if ((todaysDateArr[0] * 1) == (itemDate[0] * 1) &&
      (todaysDateArr[1] * 1) == (itemDate[1] * 1) &&
      (todaysDateArr[2] * 1) == (itemDate[2] * 1))
    {
      // console.log(true)
      return true
    }
    // console.log(false)
    return false;
  }

  const getDayText = () => {
    // local time
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // console.log(new Date(props.dateViewing).getDay())
    // console.log(new Date(props.dateViewing).getDate())
    // console.log(props.item)
    return [weekDays[new Date(props.item).getDay()].substring(0, 3), new Date(props.item).getDate()]
  }

  const isDateSelected = () => {
    // const itemDate = [new Date(props.item.date).getDate(), new Date(props.item.date).getMonth(), new Date(props.item.date).getFullYear()]

    if ((itemDate[0] * 1) == (selectedDate[0] * 1) &&
      (itemDate[1] * 1) == (selectedDate[1] * 1) &&
      (itemDate[2] * 1) == (selectedDate[2] * 1))
    {
      return true
    }
    return false;
  }

  const setSelectedDate = () => {
    var result = new Date()
    // console.log(result.toISOString() + '//')

    console.log(result.toISOString())
    console.log(result.toLocaleDateString())
    console.log(itemDate)
    console.log("SADNJAODNOASNDISANOIDSANIO")

    result.setUTCMonth((itemDate[0] * 1) - 1)
    result.setUTCDate((itemDate[1] * 1))
    result.setUTCFullYear(itemDate[2])
    console.log(result.toISOString())

    // console.log(result.toISOString() + '++')

    // result.setUTCMonth((itemDate[0] * 1) - 1)
    // result.setUTCDate((itemDate[1] * 1) - 1)
    // result.setUTCFullYear(itemDate[2])
    // console.log(result.toISOString() + '**')
    props.setDateViewing(result)
  }
  // console.log('\n\n '+ itemDate + '\n\n ')

  return (
            // <View style={[styles.calendarEventBubble, {backgroundColor: bubbleColor, height: bubbleHeight, top: bubbleStartingPointY}]}>
            //     <Text style={{fontSize:14, fontWeight:"bold", color: "#fff"}}>{props.item['category']}</Text>
            // </View>
            <TouchableOpacity
            onPress={() => setSelectedDate()}
            activeOpacity={1}
            >
              <View 
            style={{width: 42, height: '100%', marginHorizontal: 4,}}
            >
              <View 
                style={[styles.datePickerUnSelected, isDateSelected() && styles.datePickerSelected]}
                >
                    
                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                        <Text>
                          {getDayText()[0]}
                        </Text>
                        <View 
                        style={[styles.dateCircle, isDateToday() && styles.dateCircleToday]}
                        >
                            <Text 
                            style={[styles.dateText, isDateToday() && styles.dateTextToday]}
                            >
                                {getDayText()[1]}
                            </Text>
                        </View>
                    </View>
              </View>
            </View>
            </TouchableOpacity>
            
  )
}

const NewLog = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const[logs, setLogs] = useState([]);
  const[dateViewing, setDateViewing] = useState(new Date());
  // console.log(dateViewing)

  const db = getDatabase(firebase);

  const getData = () => {
    var data = {};
    onValue(ref(db, 'users/1/'), (snapshot) => {
    data = snapshot.val();
    });
    console.log("FROM NEWLOG.JS:")
    console.log(data)
    console.log('=========================================================')
    return data
  }

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }


  // SENDS IT IN LOCAL TIME
  const getDateViewingsData = () => {
    // setDateViewing(new Date().toISOString())
    // console.log(dateViewing + ' *** DATE VIEWING')
    const data = getData()
    // console.log(data['logs'][0] + ' *** GET DATA')
    var result = []

    for (var log in data['logs']) 
    {
      // console.log('test')
      var currentLogStartDate = parseISOString(data['logs'][log]['startDate'])
      var currentLogEndDate = parseISOString(data['logs'][log]['endDate'])
      // console.log(currentLogStartDate)
      // var currentLogStartDateLocalTime = parseISOString(currentLogStartDate.toLocaleTimeString())
      // console.log('now LOCAL time: ' + currentLogStartDate.toLocaleDateString())

      var currentLogStartDateLocalTime = [currentLogStartDate.toLocaleDateString()[0], currentLogStartDate.toLocaleDateString().substring(2,4), currentLogStartDate.toLocaleDateString().substring(5)]
      var currentLogEndDateLocalTime = [currentLogEndDate.toLocaleDateString()[0], currentLogEndDate.toLocaleDateString().substring(2,4), currentLogEndDate.toLocaleDateString().substring(5)]
      console.log('log day' + currentLogStartDateLocalTime + ' ' + currentLogEndDateLocalTime)
      console.log('log day specific' + currentLogStartDate + ' ' + currentLogEndDate)

      console.log('dv ' + dateViewing)
      // var selectedDayString = parseISOString(dateViewing)
      // console.log('dv2 ' + selectedDayString)
      // console.log('=============== ' + dateViewing + ' ==================')

      // TODO: refactor to make scalable for months that are one or two digits
      // var selectedDay = [dateViewing.toLocaleDateString()[0], dateViewing.toLocaleDateString().substring(2,4), dateViewing.toLocaleDateString().substring(5)]
      var selectedDay = [dateViewing.getMonth() + 1, dateViewing.getDate() + 1, dateViewing.getFullYear()]

      console.log('selected day' + selectedDay)
      console.log('selected day' + dateViewing.toLocaleDateString())
      // console.log('selected day' + new Date ().setMonth(1).getMonth())


      // Sends just the part of the event that occurs during that day
      // TODO: refactor to cover months/years

      // returns a string of the greater date or equal
      // format: [DD, MM, YYYY]
      function compareDates (d1, d2) {
        // same year
        if(d1[2] == d2[2])
        {
          // same month
          if(d1[0] == d2[0])
          {
            // same day
            if(d1[1] == d2[1])
            {
              return "equal"
            }
            
            // same month diff days
            return d2[1] > d1[1] ? "d2" : "d1"
          }

          // same year diff months
          return d2[0] > d1[0] ? "d2" : "d1"
        }

        // diff years
        return d2[2] > d1[2] ? "d2" : "d1"
      }

      // handles logs that span mulitple dates
      if (compareDates(currentLogStartDateLocalTime, currentLogEndDateLocalTime) != 'equal')
      {
        // includes case for if its Day X - Day Y @ midnight
        // implies that enddate is greater chronologically than start date but may be new month
        if (currentLogStartDateLocalTime[1] != currentLogEndDateLocalTime[1])
        {
          // console.log('true! ' + currentLogStartDateLocalTime[1] + ' ' + currentLogEndDateLocalTime[1])
          if (currentLogEndDateLocalTime[1] > selectedDay[1])
          {
            // sets to end of the day
            currentLogEndDateLocalTime[0] = currentLogStartDateLocalTime[0];
            currentLogEndDateLocalTime[1] = currentLogStartDateLocalTime[1];
            currentLogEndDateLocalTime[2] = currentLogStartDateLocalTime[2];

            currentLogEndDate.setFullYear(currentLogStartDateLocalTime[2])
            currentLogEndDate.setMonth(currentLogStartDateLocalTime[0])
            currentLogEndDate.setDate(currentLogStartDateLocalTime[1])
            currentLogEndDate.setHours(23)
            currentLogEndDate.setMinutes(59)
            currentLogEndDate.setSeconds(0)
            currentLogEndDate.setMilliseconds(0)
          }
          else if (currentLogStartDateLocalTime[1] < selectedDay[1])
          {
            // sets to beginning of the day
            currentLogStartDateLocalTime[0] = currentLogEndDateLocalTime[0];
            currentLogStartDateLocalTime[1] = currentLogEndDateLocalTime[1];
            currentLogStartDateLocalTime[2] = currentLogEndDateLocalTime[2];

            currentLogStartDate.setFullYear(currentLogStartDateLocalTime[2])
            currentLogStartDate.setMonth(currentLogStartDateLocalTime[0])
            currentLogStartDate.setDate(currentLogStartDateLocalTime[1])
            currentLogStartDate.setHours(0)
            currentLogStartDate.setMinutes(0)
            currentLogStartDate.setSeconds(0)
            currentLogStartDate.setMilliseconds(0)
          }
          
        }
        // else if (currentLogStartDateLocalTime[1] != currentLogEndDateLocalTime[1])
        // {
        //   localDay = endDateLocalDay;
        //   localHours = '00'
        //   localMinutes = '00'
        // }
      }

      if (currentLogStartDateLocalTime[0] == selectedDay[0]
          && currentLogStartDateLocalTime[1] == selectedDay[1]
          && currentLogStartDateLocalTime[2] == selectedDay[2])
      {
        console.log('this date is converted because it is ' + currentLogStartDateLocalTime
        + 'and the selected day is ' + selectedDay)

        var obj = data['logs'][log];

        // CONVERT TO LOCAL TIME
        

        console.log('currentstartdateUTC ' + currentLogStartDate.toUTCString())
        console.log('currentenddateUTC ' + currentLogEndDate.toUTCString())
        console.log('currentstartdateLocal ' + new Date(currentLogStartDate.toUTCString()).toLocaleString())
        console.log('currentenddateLocal ' + new Date(currentLogEndDate.toUTCString()).toLocaleString())

        var localeDate = currentLogStartDate.toLocaleString();
        // console.log(localeDate)
        var localHours = localeDate.substring(localeDate.indexOf(',') + 2, localeDate.indexOf(':'))
        if (localeDate.includes('AM') && localHours == '12')
        {
          localHours = '0'
        }
        if (localeDate.includes('PM') && localHours != '12')
        {
          // console.log(typeof(localHours) + ' ' + localHours)
          // console.log(localeDate)
          localHours = ((localHours * 1) + 12) + ''
          // console.log(localHours)
        }
        // console.log(localeDate)
        // console.log(localeDate.includes('PM'))
        // console.log(localHours)

        var localMinutes = localeDate.substring(localeDate.indexOf(':') + 1)
        localMinutes = localMinutes.substring(0, localMinutes.indexOf(':'))

        var localDay = localeDate.substring(0, localeDate.indexOf('/'))
        var localMonth = localeDate.substring(localeDate.indexOf('/') + 1)
        localMonth = localMonth.substring(0, localMonth.indexOf('/'))

        var localYear = localeDate.substring(localeDate.indexOf('/') + 1)
        // console.log(localYear)
        localYear = localYear.substring(localYear.indexOf('/') + 1)
        // console.log(localYear)
        localYear = localYear.substring(0,4)
        // console.log (localMinutes + ' -- ' + localDay + ' -- ' + localMonth + ' -- ' + localYear)


        var localeEndDate = currentLogEndDate.toLocaleString();

        var endDateLocalHours = localeEndDate.substring(localeEndDate.indexOf(',') + 2, localeEndDate.indexOf(':'))
        if (localeEndDate.includes('AM') && endDateLocalHours == '12')
        {
          endDateLocalHours = '0'
        }
        if (localeEndDate.includes('PM') && endDateLocalHours != '12')
        {
          // console.log(typeof(endDateLocalHours) + ' ' + endDateLocalHours)
          // console.log(localeEndDate)
          endDateLocalHours = ((endDateLocalHours * 1) + 12) + ''
          // console.log(endDateLocalHours)
        }


        var endDateLocalMinutes = localeEndDate.substring(localeEndDate.indexOf(':') + 1)
        endDateLocalMinutes = endDateLocalMinutes.substring(0, endDateLocalMinutes.indexOf(':'))

        var endDateLocalDay = localeEndDate.substring(0, localeEndDate.indexOf('/'))
        var endDateLocalMonth = localeEndDate.substring(localeEndDate.indexOf('/') + 1)
        endDateLocalMonth = endDateLocalMonth.substring(0, endDateLocalMonth.indexOf('/'))

        var endDateLocalYear = localeEndDate.substring(localeEndDate.indexOf('/') + 1)
        endDateLocalYear = endDateLocalYear.substring(endDateLocalYear.indexOf('/') + 1)
        endDateLocalYear = endDateLocalYear.substring(0,4)

        if (localHours.length == 1)
        {
          localHours = '0' + localHours;
        }
        if (localDay.length == 1)
        {
          localDay = '0' + localDay;
        }
        if (localMonth.length == 1)
        {
          localMonth = '0' + localMonth;
        }

        if (endDateLocalHours.length == 1)
        {
          endDateLocalHours = '0' + endDateLocalHours;
        }
        if (endDateLocalDay.length == 1)
        {
          endDateLocalDay = '0' + endDateLocalDay;
        }
        if (endDateLocalMonth.length == 1)
        {
          endDateLocalMonth = '0' + endDateLocalMonth;
        }


        // // Sends just the part of the event that occurs during that day
        // if (localDay != endDateLocalDay)
        // {
        //   // includes case for if its Day X - Day Y @ midnight
        //   if ((endDateLocalDay * 1) > (selectedDay[0] * 1))
        //   {
        //     endDateLocalDay = localDay;
        //     endDateLocalHours = '23'
        //     endDateLocalMinutes = '59'
        //   }
        //   else if ((localDay * 1) < (selectedDay[0] * 1))
        //   {
        //     localDay = endDateLocalDay;
        //     localHours = '00'
        //     localMinutes = '00'
        //   }
        // }
        

        obj['startDate'] = localYear + '-' + localMonth + '-' + localDay + 'T' + localHours + ':' + localMinutes + ':00.000Z'
        obj['endDate'] = endDateLocalYear + '-' + endDateLocalMonth + '-' + endDateLocalDay + 'T' + endDateLocalHours + ':' + endDateLocalMinutes + ':00.000Z'
        console.log(obj['startDate'])
        console.log(obj['endDate'])
        console.log('--------------- :) ============')


        result = [...result, obj]
        // console.log("MATCH!!!")
      }

    }

    // console.log(JSON.stringify(result) + ' *** RESULT\n\n')

    return result;
  }

  const getDates = () => {
    // get first date from logs and create array of logs from now to current date
    // beware of time zones
    const data = getData()
    // console.log(data['logs'][0] + ' *** GET DATA')
    // var result = []

    var firstDate = new Date()
    var currentStartDate;

    for (var log in data['logs']) 
    {
      // console.log('----' + firstDate.toISOString())
      currentStartDate = parseISOString(data['logs'][log]['startDate'])

      // get first date
      if (currentStartDate < firstDate)
      {
        firstDate = currentStartDate
      }
    }

    // const firstDateLocal = [firstDate.getDate(), firstDate.getMonth(), firstDate.getFullYear()]
    // const todayDateLocal = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]

    var getDaysArray = function(start, end) {
      for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt).toLocaleString());
      }

      if(arr[arr.length - 1].substring(2,4) != new Date().toLocaleString().substring(2,4))
      {
        arr.push(new Date().toLocaleString())
      }

      // for visual asthetics have an extra day
      var nextDay = new Date()
      nextDay.setDate(nextDay.getDate() + 1)
      arr.push(nextDay.toLocaleString())

      // console.log(arr)
      return arr;
    };  

    return getDaysArray(firstDate, new Date())
    // go through years, only does once if same year
    // for (var i = firstDateLocal[2]; i < todayDateLocal[2] + 1; i++)
    // {
    //   for (var j = firstDateLocal[0]; j < todayDateLocal[0]; j++)
    //   {

    //   }
    // }

  }

  // const isDateSelected = () => {
  //   return true;
  // }

  // const isDateToday = () => {
  //   return true;
  // }

  // const getDateSelectedDay = () => {
    
  //   // local time
  //   const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   // const dayOfWeek = weekDays[new Date().getDay()];
  //   console.log(new Date(dateViewing).getDay())
  //   console.log(new Date(dateViewing).getDate())
  //   return [weekDays[new Date(dateViewing).getDay()].substring(0, 3), new Date(dateViewing).getDate()]
  // }

  const getClippedDateViewing = () => {
    var result = JSON.stringify(dateViewing)
    return result.substring(1,11)
  }

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'row'}}>

        {/* Container */}
        <View style={{flex: 1}}>
          <View style={{marginBottom: 36}}></View>
          <Text style={styles.h1}>
            Log Your Time
          </Text>
          <View style={{justifyContent: 'center', flex: 1}}>
            <HorizontalScrollBar
            categoryData={categoryData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            />
          </View>
        </View>


        <View
        style={{flex: 1, flexDirection: 'column'}}
        >
          {/* Date navigation */}
          <View style={{height: 64}}>
              <FlatList
              data={getDates()}
              renderItem={({item, index}) => {
                  return (
                      <SingleDate item={item} index={index} dateViewing={dateViewing} setDateViewing={setDateViewing}></SingleDate>
                  )
              }}
              style={{
               flex: 1, left: 72, width: 123, 
                  flexDirection: 'row',
              }}
              contentContainerStyle={{
                alignItems: 'center', justifyContent: 'center',
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              // contentOffset={{x: 150, y: 0}}
              >
              </FlatList>
          </View>

          <Calendar data={getDateViewingsData()} dateViewing={getClippedDateViewing()}/>
        </View>

        
      </SafeAreaView>

    )
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
  datePickerUnSelected: {
    width: '100%', 
    height: '100%',  
    justifyContent:'center', 
    alignItems: 'center'
},
  datePickerSelected: {
      borderRadius: 14, 
      borderColor: '#000', 
      borderWidth: 1,
  },
  dateCircle: {
      justifyContent:'center',
      alignItems: 'center',
      width: 28, 
      height: 28, 
      borderRadius: 28, 
      borderColor: '#000'
  },
  dateCircleToday: {
      backgroundColor:'#000',
  },
  dateText: {
      fontSize: 16, 
      color: '#000'
  },
  dateTextToday: {
      color: '#fff'
  }
})  

export default NewLog