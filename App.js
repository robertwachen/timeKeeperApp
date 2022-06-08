import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native-web";

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
    </NavigationContainer>
  );
}

export default App;
