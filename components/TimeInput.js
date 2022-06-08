import { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DatePicker } from '../components/DatePicker';

const TimeInput = (props) => {
    return (
        <View>
            <Text style={styles.h1}>Select Time</Text>
            <View>
                <DatePicker />
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
  })  

export default TimeInput