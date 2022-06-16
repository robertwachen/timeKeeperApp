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


const NewLog = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const[logs, setLogs] = useState([]);
  const[dateViewing, setDateViewing] = useState('2022-06-16T07:48:57.020Z');

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
      var currentLogStartDateLocalTime = parseISOString(currentLogStartDate.toLocaleTimeString())
      // console.log('now LOCAL time: ' + currentLogStartDate.toLocaleDateString())

      var currentLogStartDateLocalTime = [currentLogStartDate.toLocaleDateString()[0], currentLogStartDate.toLocaleDateString().substring(2,4), currentLogStartDate.toLocaleDateString().substring(5)]
      var currentLogEndDateLocalTime = [currentLogEndDate.toLocaleDateString()[0], currentLogEndDate.toLocaleDateString().substring(2,4), currentLogEndDate.toLocaleDateString().substring(5)]
      // console.log('log day' + currentLogStartDateLocalTime)
      var selectedDayString = parseISOString(dateViewing)
      var selectedDay = [selectedDayString.toLocaleDateString()[0], selectedDayString.toLocaleDateString().substring(2,4), selectedDayString.toLocaleDateString().substring(5)]

      // console.log('selected day' + selectedDay)
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


        /*

        */
        // var localMinutes = currentLogStartDate.toLocaleTimeString()
        // localMinutes = localMinutes.substring(localMinutes.indexOf(':') + 1)
        // localMinutes = localMinutes.substring(0, localMinutes.indexOf(':'))
        
        // var localHours = currentLogStartDate.toLocaleTimeString()
        // console.log('converted ' + localHours)
        // localHours = localHours.substring(0, localHours.indexOf(':'))

        // var localDay = currentLogStartDateLocalTime[0]
        // var localMonth = currentLogStartDateLocalTime[1]
        // var localYear = currentLogStartDateLocalTime[2]
        // // console.log('LOCAL START' + localMinutes + ' ' + localHours + ' ' + currentLogStartDate.toLocaleTimeString())

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

        // var endDateLocalMinutes = currentLogEndDate.toLocaleTimeString()
        // endDateLocalMinutes = endDateLocalMinutes.substring(endDateLocalMinutes.indexOf(':') + 1)
        // endDateLocalMinutes = endDateLocalMinutes.substring(0, endDateLocalMinutes.indexOf(':'))

        // var endDateLocalHours = currentLogEndDate.toLocaleTimeString()
        // endDateLocalHours = endDateLocalHours.substring(0, endDateLocalHours.indexOf(':'))

        // var endDateLocalDay = currentLogEndDateLocalTime[0]
        // var endDateLocalMonth = currentLogEndDateLocalTime[1]
        // var endDateLocalYear = currentLogEndDateLocalTime[2]

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

        {/* THIS NEEDS TO CHANGE TO JUST TODAY'S DATA! */}
        <Calendar data={getDateViewingsData()}/>
      
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
  }
})  

export default NewLog