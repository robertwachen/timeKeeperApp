import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import * as SQLite from "expo-sqlite";
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


const screenWidth = Dimensions.get("window").width;

// const barGraphData = {
//   labels: ["Cat. A", "Cat. B", "Cat. C", "Cat. D", "Cat. E"],
//   datasets: [
//     {
//       data: [2.5, 4, 1.75, 6.5, 8]
//     }
//   ]
// };

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




const db = SQLite.openDatabase('db.testDb') // returns Database object

const Home = ({navigation}) => {

  const[logs, setLogs] = useState([]);
  const [barGraphData, setBarGraphData] = useState({
    labels: ['a', 'b'],
    datasets: [
      {
        data: [1, 2] 
      }
    ]
  });

    // setBarGraphData({
    //   labels: todaysData1D()[0],
    //     datasets: [
    //       {
    //         data: todaysData1D()[1],
    //       }
    //     ]
    // })

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
            console.log("SQL QUERY RESULTS: ")
            console.log(logs)
          }
        );
      })
    } catch (error) {
      console.log('Error', error)
    }
  }


  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = weekDays[new Date().getDay()];

  // console.log(new Date())

  // const todaysData = logs;
  // console.log(logs)
  // console.log(logs[2]["Date"].substring(1, 11))
  // console.log(JSON.stringify(new Date()).substring(1, 11))
  // console.log((logs[2]["Date"].substring(1, 11)) === (JSON.stringify(new Date()).substring(1, 11)))
  // var start = ((logs[2]["Start_Time"].substring(12, 17)).substring(0,2) * 60) + ((logs[2]["Start_Time"].substring(12, 17)).substring(3) * 1)
  // var end = ((logs[2]["End_Time"].substring(12, 17)).substring(0,2) * 60) + ((logs[2]["End_Time"].substring(12, 17)).substring(3) * 1)
  // console.log((end-start) / 60)
  // console.log(JSON.stringify(new Date()).substring(1, 11))
  // console.log((logs[2]["Date"].substring(1, 11)) === (JSON.stringify(new Date()).substring(1, 11)))

  // console.log("hello")
  const todaysData = () => {
    // Format: [Category, Time], [...]
    var result = [[]];
    // console.log('154')
    const today = JSON.stringify(new Date()).substring(1, 11);
    for (var i = 0; i < logs.length; i++) {
      // make sure it's only today's data
      var currentLog = logs[i];
      if (currentLog["Date"].substring(1, 11) === today)
      {
        // console.log('match!')
        // console.log(result.length)
        // go thru the result 2d array and find the category, if at end then append the new category with time
        for (var j = 0; j < result.length; j++)
        {
          // console.log(j)
          console.log("CURRENT LOG: ")
          console.log(currentLog)
          var start = ((currentLog["Start_Time"].substring(12, 17)).substring(0,2) * 60) + 
            ((currentLog["Start_Time"].substring(12, 17)).substring(3) * 1);
          var end = ((currentLog["End_Time"].substring(12, 17)).substring(0,2) * 60) + 
            ((currentLog["End_Time"].substring(12, 17)).substring(3) * 1);
          console.log ("ABBOUT TO MERGE TIME, END IS " + end + " START IS " + start)
          const timeSpent = (end-start) / 60;
          const category = currentLog["Category"];
          if ((result[j][0]) === category)
          {
            console.log("ABOUT TO ADD TIME SPENT")
            console.log("CATEGORY " + category)
            console.log("CURRENT TIME SPENT " + result[j][1])
            console.log("ADDED TIME SPENT " + timeSpent)
            result[j][1] += timeSpent;
            console.log("RESULT " + result[j][1])
          } 
          // No existing category match
          else if (j == (result.length - 1)) 
          {
            result = [...result, [category, timeSpent]];
            // j++; // Since result.length increases by one, avoids infinite loop
          }
        }
        // Only add new categories, if it's an existing category then just add time
        // if (!result.includes(todaysData[i]["Category"]))
        // {
        //   todaysDataCategories = [...todaysDataCategories, todaysData[i]["Category"]];
        // }
      }
      
    }
    console.log("The results are in: ")
    console.log(result)
    return result;
  }
  

  var todaysData1D = () => {
    var arrToConvert = todaysData().splice(1);
    var newArr = [[],[]];
    // console.log('arrtoconvert: *****')
    // console.log(arrToConvert)

    // Category names
    for(var i = 0; i < arrToConvert.length; i++)
    {
        // console.log(i)
        newArr[0] = newArr[0].concat(arrToConvert[i][0]);
        newArr[1] = newArr[1].concat(arrToConvert[i][1]);
    }

    console.log("***************");
    console.log(newArr);
    return newArr
  }

  const updateGraphData = () => {
    // console.log("TIMES HIT +1") hits 3 times for some reason
    const data = todaysData1D();
    // console.log(data)
    setBarGraphData({
      labels: data[0],
        datasets: [
          {
            data: data[1],
          }
        ]
    })
  }

  useEffect(() => {
    createTable();
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "TRUNCATE TABLE newDB"
    //   ),
    //   [],
    //   (tx, rs) => console.log('successfull'), //this isn't showing up?
    //   (error) => console.log(error)
    // })
    getData();
    navigation.addListener('focus', () => {
      updateGraphData();
      console.log('Refreshed!');
    });
    // return refresh;
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 16,
      }}></View>
      <Text style={styles.h1}>Your {dayOfWeek}, Categorized</Text>
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