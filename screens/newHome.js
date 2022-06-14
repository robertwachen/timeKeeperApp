import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import CategoryList from '../components/CategoryList';
import WeekPicker from '../components/WeekPicker';


const screenWidth = Dimensions.get("window").width;


const NewHome = ({navigation}) => {

  const[logs, setLogs] = useState([]);

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = weekDays[new Date().getDay()];

  
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
      <CategoryList></CategoryList>
      

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