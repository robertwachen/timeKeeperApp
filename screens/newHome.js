import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import CategoryList from '../components/CategoryList';
import WeekPicker from '../components/WeekPicker';
import { firebase } from '../config';
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import categoryData from '../data/categoryData';


const screenWidth = Dimensions.get("window").width;


const NewHome = ({navigation}) => {
  // const[logs, setLogs] = useState([]);



  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = weekDays[new Date().getDay()];

  const db = getDatabase(firebase);
  
  function writeUserData(userId, firstName, lastName, email, password, logs, goals) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      logs: logs,
      goals: goals,
    });
  }

  const updates = {};
  updates['/users/1/email'] = 'testing';

  const testingDB = ref(db, 'users/1');
  
  const logsDB = [{
    startDate: '2022-06-14T23:15:30.423Z',
    endDate: '2022-06-14T23:16:00.423Z',
    category: 'Sleep',
    subCategory: '',
  }];

  const goalsDB = [
    {
    category: 'Waste',
    hours: 10,
    type: 'Budget',
    imagePath: '../assets/icons/waste.png',
    },
    {
      category: 'Sleep',
      hours: 56,
      type: 'Budget',
      imagePath: '../assets/icons/sleep.png',
    },
    {
      category: 'Startup',
      hours: 45,
      type: 'Goal',
      imagePath: '../assets/icons/startup.png',
    }
];
  
  useEffect(() => {
    // writeUserData('1', 'Robert', 'Wachen', 'robert@wachenmail.com', 'password', logsDB, goalsDB)
    // update(ref(db), updates);
    console.log('Done!')
    // onValue(testingDB, (snapshot) => {
    //   console.log(snapshot.val());
    // });
  });
  
  const getData = () => {
    var data = {};
    onValue(ref(db, 'users/1/'), (snapshot) => {
    data = snapshot.val();
    });
    console.log(data)
    return data
  }

  

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>Your {dayOfWeek}, Categorized</Text>
      <View style={{
        margin: 8,
      }}></View>
      <WeekPicker></WeekPicker>
      <View style={{
        margin: 16,
      }}></View>
      <CategoryList 
      data={getData()}
      ></CategoryList>
      

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

export default NewHome