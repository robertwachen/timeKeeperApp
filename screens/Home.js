import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const barGraphData = {
  labels: ["Cat. A", "Cat. B", "Cat. C", "Cat. D", "Cat. E"],
  datasets: [
    {
      data: [2.5, 4, 1.75, 6.5, 8]
    }
  ]
};

const barGraphConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `#212629`,
  barPercentage: 1,
  propsForBackgroundLines: {x1:'64'},
  propsForLabels: {},
  decimalPlaces: 0,
};

const pieGraphData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "#000",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#333",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "#666",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#999",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "#CCC",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const pieGraphConfig = {
  color: (opacity = 1) => `#ffffff`,
};

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>Your Friday, Categorized</Text>
      <View style={{
        margin: 8,
      }}></View>
      <BarChart
        // style={graphStyle}
        data={barGraphData}
        width={screenWidth-32}
        height={390}
        yAxisSuffix=" hrs"
        chartConfig={barGraphConfig}
        fromZero='true'
      />
      <Text style={styles.h2}>Weekly Breakdown</Text>
      <PieChart
        data={pieGraphData}
        width={screenWidth-32}
        height={196}
        chartConfig={pieGraphConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        // paddingLeft={"15"}
        // center={[10, 50]}
        // absolute
      />

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

export default Home