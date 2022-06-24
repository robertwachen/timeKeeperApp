import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native-web";
import LoginScreen from "./screens/LoginScreen";

// import { BottomNav, FocusedStatusBar } from "./components";
import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins.ttf"),
  });

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      {/* <Tabs /> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{headerShown: false,}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>
      </Stack.Navigator>
      
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
      {/* <Tab.Screen name="Login" component={LoginScreen} options={{
                headerShown: false,
                tabBarVisible:false,
                navigationBarStyle : {navBarHidden: true },
                // navBarHidden: true
            }}
            /> */}
    </NavigationContainer>
  );
}

export default App;
