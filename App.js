import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native-web";

import Home from "./screens/Home";
import Details from "./screens/Details";
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
      <Tabs />
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
