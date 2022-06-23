import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import CategoryList from '../components/CategoryList';
import WeekPicker from '../components/WeekPicker';
import { firebase } from '../config';
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import categoryData from '../data/categoryData';


const screenWidth = Dimensions.get("window").width;



function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}


const NewHome = ({navigation}) => {
  // const[logs, setLogs] = useState([]);
  const [data, setData] = useState({})
  const [weekSelected, setWeekSelected] = useState({})




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
      category: 'Body',
      hours: 56,
      type: 'Budget',
      imagePath: '../assets/icons/sleep.png',
    },
    {
      category: 'Startup',
      hours: 45,
      type: 'Goal',
      imagePath: '../assets/icons/startup.png',
    },
    {
      category: 'Social',
      hours: 30,
      type: 'Goal',
      imagePath: '../assets/icons/startup.png',
    },
    {
      category: 'School',
      hours: 10,
      type: 'Budget',
      imagePath: '../assets/icons/startup.png',
    }
];

const updates = {};
updates['/users/1/goals'] = goalsDB;
  
  useEffect(() => {
    // writeUserData('1', 'Robert', 'Wachen', 'robert@wachenmail.com', 'password', logsDB, goalsDB)
    // update(ref(db), updates);
    onValue(ref(db, 'users/1/'), (snapshot) => {
      setData(snapshot.val());
      });
    console.log('Done! :D')
    // console.log(JSON.stringify(data))
    // console.log('Done2!')
    // onValue(testingDB, (snapshot) => {
    //   console.log(snapshot.val());
    // });
    // var a = getSelectedWeeksData()
    // console.log(JSON.stringify(a))

  }, []);

  const getWeeksBetweenDates = () => {

    const firstDate = () => {
      var firstDate = new Date()
      var currentStartDate;
  
      for (var log in data['logs']) 
      {
        currentStartDate = parseISOString(data['logs'][log]['startDate'])
  
        // get first date
        if (currentStartDate < firstDate)
        {
          firstDate = currentStartDate
        }
      }

      // console.log('firstdate: ', firstDate)
      return firstDate
    }

    // -1 because week starts on monday
    function weekStart(date, numOfDays) {
      // console.log(numOfDays)
      date.setDate(date.getDate() - numOfDays);
      // console.log(date)
    
      return date;
    }

    // 6 so goes to sunday
    function weekEnd(date) {
      // console.log(numOfDays)
      date.setDate(date.getDate() + 6);
      return date;
    }

    function getWeeksBetweenDatesHelper(startDate, endDate) {

      // console.log(startDate,endDate, 'asdsadnio')
      //first the function and variable definitions
      let weeksBetweenDates = []
      const addDays = function (days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
      };
      //now our Sunday check
      let currentDate = startDate
      if (currentDate.getDay() > 0) {
          // console.log('not a sunday...adjusting')

          // +1 for monday
          currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
      }
       
      while (currentDate <= endDate) {
        let endWeekDate = addDays.call(currentDate, 6);
        weeksBetweenDates.push(
          {
            begin: currentDate.toLocaleDateString(), 
            end: endWeekDate.toLocaleDateString(),
            title: 'temp'
          });
        currentDate = addDays.call(currentDate, 7);
      }

      weeksBetweenDates.reverse()


      for (var i = 0; i < weeksBetweenDates.length; i++)
      {
        if (i == 0)
        {
          weeksBetweenDates[i]['title'] = 'This Week'
        }
        else if (i == 1)
        {
          weeksBetweenDates[i]['title'] = 'Last Week'
        }
        else
        {
          weeksBetweenDates[i]['title'] = (i) + ' Weeks Ago'
        }
      }

      return weeksBetweenDates;
    };

    const weekRange = [weekStart(firstDate(), firstDate().getDay() - 1), weekEnd(weekStart(new Date(), new Date().getDay() - 1))]
    // console.log('weekrange', weekRange)

    // console.log(getWeeksBetweenDatesHelper(weekRange[0], weekRange[1]))

    return(getWeeksBetweenDatesHelper(weekRange[0], weekRange[1]))
  }

  const getSelectedWeeksData = () => {
    var weekLogs = [{}]
  
    for (var log in data['logs']) 
    {
      // console.log(log)
      var currentLogStartDate = parseISOString(data['logs'][log]['startDate']).toLocaleDateString()
      var currentLogEndDate = parseISOString(data['logs'][log]['endDate']).toLocaleDateString()

      // console.log(currentLogStartDate, currentLogEndDate)

      if (currentLogStartDate >= weekSelected['begin'] && currentLogEndDate <= weekSelected['end'])
      {
        // console.log('hit!')
        // console.log(data['logs'][log])
        weekLogs = [...weekLogs, data['logs'][log]]
      }
    }

    // console.log('asdsasfndio')
    // console.log(JSON.stringify(weekLogs))
    var result = {
      logs: weekLogs,
      goals: data['goals']
    }
    // console.log('=======\n')

    return result
  }

  
  // const getData = () => {
  //   var data = {};
  //   onValue(ref(db, 'users/1/'), (snapshot) => {
  //   data = snapshot.val();
  //   });
  //   console.log(data)
  //   console.log('thats the data!')
  //   return data
  // }

  

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        margin: 8,
      }}></View>
      <Text style={styles.h1}>Your {dayOfWeek}, Categorized</Text>
      <View style={{
        margin: 8,
      }}></View>
      <WeekPicker weeksBetweenDates={getWeeksBetweenDates()} weekSelected={weekSelected} setWeekSelected={setWeekSelected}/>
      <View style={{
        margin: 8,
      }}></View>
      <CategoryList 
      data={getSelectedWeeksData()}
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

export default NewHome