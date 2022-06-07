import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 24,
      }}></View>
      <Text style={styles.h1}>Your Friday, Categorized</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: '#033acc',
    textAlign: 'center',
    fontWeight: '600',
  }
  })  

export default Home