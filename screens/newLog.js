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

const NewLog = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const[logs, setLogs] = useState([]);

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

        {/* Container */}
        <View style={{flex: 1, flexDirection: 'row'}}>

          {/* For nav/padding, TODO */}
          <View style={{height: 200}}>

          </View>

          {/* This is for left side timestamps*/}
          <View style={{width: 56}}>
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
            
          </View>

          {/* This is for gridlines and calendar */}
          <View style={{flex: 1}}>

            {/* This is for events */}
            <View style={{
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
            </View>

            <View style={{height: 32}}></View>
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
            </View>
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