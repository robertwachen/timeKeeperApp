import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HorizontalScrollBar from '../components/HorizontalScrollBar';
import categoryData from '../data/categoryData';
import TimeInput from '../components/TimeInput';

import { FocusedStatusBar } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import sqlite from 'react-native-sqlite-storage';
import * as SQLite from "expo-sqlite";
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';

// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
//   );
//   return SQLite.openDatabase('myDatabaseName.db');
// }


// const db = sqlite.openDatabase(
//   {
//     name:'mainDB',
//     location: 'default',
//   },
//   () => { },
//   error => { console.log(error) }
// );

// function openDatabase() {
//   if (Platform.OS === "web") {
//     return {
//       transaction: () => {
//         return {
//           executeSql: () => {},
//         };
//       },
//     };
//   }

//   const db = SQLite.openDatabase("db.db");
//   return db;
// }

// const db = openDatabase();

// Sharing.shareAsync(
//   FileSystem.documentDirectory + 'SQLite/main', 
//   {dialogTitle: 'share or copy your DB via'}
// ).catch(error =>{
//   console.log(error);
// })


const db = SQLite.openDatabase('db.testDb') // returns Database object

const Log = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const[logs, setLogs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState((new Date()));



  // const startTime = new Date();
  // const endTime = new Date();

  // // Puts start time in 15 minute increments floored
  // startTime.setHours(startTime.getHours(),(Math.floor(startTime.getMinutes() / 15) * 15), 0)
  // this is rly jank
  endTime.setHours((startTime.getHours() - 4.0), 0, 0)


  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS newDB (id INTEGER PRIMARY KEY AUTOINCREMENT, Category TEXT NOT NULL, Date TEXT NOT NULL, Start_Time TEXT NOT NULL, End_Time TEXT NOT NULL);"
      ),
      [],
      (tx, rs) => console.log('successfull'), //this isn't showing up?
      (error) => console.log(error)
    })
  }
  
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM newDB",
          [],
          (tx, results) => {
            setLogs(results.rows._array);
            console.log("RESULTS: ")
            console.log(logs)
          }
        );
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
  
  const setData = (log) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          // "INSERT INTO Logs (Category) VALUES ('a');"
          "INSERT INTO newDB (Category, Date, Start_Time, End_Time) VALUES (?,?,?,?);",
          // ['a','b','c','d']
          [log.category, JSON.stringify(log.startDate), JSON.stringify(log.startTime), JSON.stringify(log.endTime)]
        );
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
  
  
  useEffect(() => {
    createTable();
  }, [])


  const submit = () => {
    const newLog = 
    {
      "key": logs.length,
      "category": selectedItems[0],
      "startDate": startDate,
      "startTime": startTime,
      "endTime": endTime,
    }
    // setLogs([...logs, newLog]);
    console.log("**************$$$$$$$$ NEWLOG")
    console.log(newLog)
    setData(newLog)
    getData()
  }

  const setDateFromPicker = (selectedDate) => {
    setStartDate(selectedDate);
    console.log(selectedDate)
  }

  const setStartTimeFromPicker = (selectedDate) => {
    setStartTime(selectedDate);
    console.log(selectedDate)
  }

  const setEndTimeFromPicker = (selectedDate) => {
    setEndTime(selectedDate);
    console.log(selectedDate)
  }

    return (
      <SafeAreaView style={{ flex: 1}}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>Select Category</Text>
      <View style={{
          margin: 16,
      }}></View>
      <HorizontalScrollBar 
        categoryData={categoryData}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <View style={{
          margin:24,
      }}></View>

      <Text style={styles.h1}>Select Time</Text>
      {/* <TimeInput></TimeInput> */}
      <View style={{padding: 8}}></View>
      <View style={{flexDirection: "row", paddingLeft: 24}}>
        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>Date</Text>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <DateTimePicker mode="date" display="default" value={startTime} 
            style={{width: 72}}
            onChange={setDateFromPicker}
            /> 
          </View>
        </View>

        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>Start</Text>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <DateTimePicker mode="time" display="default" value={startTime} 
            style={{width: 80}}
            onChange={setStartTimeFromPicker}
            minuteInterval={15}
            /> 
          </View>
          
        </View>

        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>End</Text>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <DateTimePicker mode="time" display="default" value={endTime} 
            style={{width: 80}}
            onChange={setEndTimeFromPicker}
            minuteInterval={15}
            /> 
          </View>
        </View>

      </View>

      <View style={{padding: 32}}></View>

      <TouchableOpacity
      onPress={() => submit()}
      >
        <View style={{backgroundColor: '#0165EC', width: 96, height: 48, 
        justifyContent: 'center', alignSelf: 'center'}}>
              <Text style={[styles.h2, {color:'#fff'}]}>Submit</Text>
        </View>
      </TouchableOpacity>

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

export default Log