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
const singleDate = () => {

}

const NewLog = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const[logs, setLogs] = useState([]);
  const[dateViewing, setDateViewing] = useState('2022-06-15T00:00:00.000Z');

  const db = getDatabase(firebase);

  const getData = () => {
    var data = {};
    onValue(ref(db, 'users/1/'), (snapshot) => {
    data = snapshot.val();
    });
    console.log(data)
    console.log("FROM NEWLOG.JS")
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

      var selectedDayString = parseISOString(dateViewing)

      // TODO: refactor to make scalable for months that are one or two digits
      var selectedDay = [selectedDayString.toLocaleDateString()[0], selectedDayString.toLocaleDateString().substring(2,4), selectedDayString.toLocaleDateString().substring(5)]

      // console.log('selected day' + selectedDay)

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

      if (compareDates(currentLogStartDateLocalTime, currentLogEndDateLocalTime) != 'equal')
      {
        // includes case for if its Day X - Day Y @ midnight
        // implies that enddate is greater chronologically than start date but may be new month
        if (currentLogStartDateLocalTime[1] != currentLogEndDateLocalTime[1])
        {
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

  const isDateSelected = () => {
    return true;
  }

  const isDateToday = () => {
    return true;
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
                  <ScrollView 
                  style={{flex: 1, left: 72, width: 123, 
                  flexDirection: 'row',
                  }}
                  contentContainerStyle={{
                      alignItems: 'center', justifyContent: 'center',
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  
                  >
                      <View style={{width: 42, height: '100%', marginHorizontal: 4,}}>
                          <View 
                          style={[styles.datePickerUnSelected, isDateSelected() && styles.datePickerSelected]}
                          >
                              
                              <View style={{justifyContent:'center', alignItems: 'center'}}>
                                  <Text>Wed</Text>
                                  <View 
                                  style={[styles.dateCircle, isDateToday() && styles.dateCircleToday]}
                                  >
                                      <Text 
                                      style={[styles.dateText, isDateToday() && styles.dateTextToday]}
                                      >
                                          15
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={{width: 42, height: '100%', marginHorizontal: 4,}}>
                          <View 
                          style={[styles.datePickerUnSelected, isDateSelected() && styles.datePickerSelected]}
                          >
                              
                              <View style={{justifyContent:'center', alignItems: 'center'}}>
                                  <Text>Thu</Text>
                                  <View 
                                  style={[styles.dateCircle, isDateToday() && styles.dateCircleToday]}
                                  >
                                      <Text 
                                      style={[styles.dateText, isDateToday() && styles.dateTextToday]}
                                      >
                                          16
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={{width: 42, height: '100%', marginHorizontal: 4,}}>
                          <View 
                          style={[styles.datePickerUnSelected, isDateSelected() && styles.datePickerSelected]}
                          >
                              
                              <View style={{justifyContent:'center', alignItems: 'center'}}>
                                  <Text>Fri</Text>
                                  <View 
                                  style={[styles.dateCircle, isDateToday() && styles.dateCircleToday]}
                                  >
                                      <Text 
                                      style={[styles.dateText, isDateToday() && styles.dateTextToday]}
                                      >
                                          17
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </ScrollView>
          </View>

          <Calendar data={getDateViewingsData()}/>
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