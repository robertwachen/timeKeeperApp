import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';

const Friends = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>This feature isn't built yet!</Text>
      <View style={{
          margin: 8,
      }}></View>
      <Text style={styles.h2}>Text Robert if you want this feature :D</Text>
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


export default Friends