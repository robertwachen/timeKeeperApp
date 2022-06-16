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

  const db = getDatabase(firebase);

  const getData = () => {
    var data = {};
    onValue(ref(db, 'users/1/'), (snapshot) => {
    data = snapshot.val();
    });
    console.log(data)
    return data
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
        <Calendar data={getData()}/>
      
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