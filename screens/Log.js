import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HorizontalScrollBar from '../components/HorizontalScrollBar';
import categoryData from '../data/categoryData';
import TimeInput from '../components/TimeInput';

import { FocusedStatusBar } from '../components';

const Log = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>Select Category</Text>
      <View style={{
          margin: 8,
      }}></View>
      <HorizontalScrollBar categoryData={categoryData}/>

      <View style={{
          margin:32,
      }}></View>

      <Text style={styles.h1}>Select Time</Text>
      {/* <TimeInput></TimeInput> */}
      <View style={{padding: 8}}></View>
      <View style={{flexDirection: "row", paddingLeft: 24}}>
        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>Date</Text>
          </View>
          <View style={{backgroundColor: 'grey', width: 96, height: 48, marginRight: 24}}>
          </View>
        </View>

        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>Start</Text>
          </View>
          <View style={{backgroundColor: 'grey', width: 96, height: 48, marginRight: 24}}>
          </View>
        </View>

        <View style={{width: 96, height: 84, marginRight: 24}}>
          <View style={{height: 32}}>
            <Text style={styles.h2}>End</Text>
          </View>
          <View style={{backgroundColor: 'grey', width: 96, height: 48, marginRight: 24}}>
          </View>
        </View>

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
  }
})  

export default Log