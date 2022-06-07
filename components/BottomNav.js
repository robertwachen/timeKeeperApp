import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from '../screens/Details';
import Home from '../screens/Home';

const BottomNav = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Details" component={Details} />
    </Tab.Navigator>
  );
}

export default BottomNav