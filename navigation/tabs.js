import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react'


import Home from '../screens/Home'
import Friends from '../screens/Friends'
import Log from '../screens/Log'
import newLog from '../screens/newLog'
import newHome from '../screens/newHome'

import LoginScreen from "../screens/LoginScreen";
import TempHome from "../screens/tempHome";

const Tab = createBottomTabNavigator();

const MiddleTabButton = ({children, onPress}) => (
    <Pressable
        style={{
            top: -16,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        
        <View style={{
            width: 64,
            height: 64,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: '#E8E8E8',
            backgroundColor: '#ffffff'
        }}>
            {children}
        </View>
    </Pressable>
);

const Tabs = () => {
    // currentscreen only done for newlog
    const [currentScreen, setCurrentScreen] = useState("Login");
    const navigation = useNavigation();

    return (
        // <NavigationContainer>
        //     <Stack.Navigator>
        //         <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        //         <Stack.Screen name="Home" component={TempHome} />
        //     </Stack.Navigator>
        // </NavigationContainer>

        // <Tab.Navigator>
        //     <Tab.Screen name="Login" component={LoginScreen}/>
        //     <Tab.Screen name="tempHome" component={TempHome}/>
        //     <Tab.Screen name="newHome" component={newHome} options={{headerShown: false,}}/>
        // </Tab.Navigator>
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                backgroundColor: '#ffffff',
                height: '80px',
                borderTopColor: '#E8E8E8',
                borderTopWidth: '1px'
            }
        }}>
            
            <Tab.Screen name="newHome" component={newHome} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity
                        onPress={() => {
                            // console.log('before ' + currentScreen)
                            navigation.navigate("newHome")
                            setCurrentScreen("newHome")
                            // console.log('after ' + currentScreen)
                            
                        }}
                        activeOpacity={1}
                    >
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        {/* <Chart_Icon height={20} width={20}/> */}
                        <Image 
                            source={require('../assets/icons/Chart.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                                margin: 5,
                                tintColor: focused ? '#212629' : '#AAAAAA'
                            }}
                        />
                        <Text style={{color: focused ? '#212629' : '#AAAAAA', fontSize:10, fontWeight:'600'}}>
                            STATS
                        </Text>
                    </View>
                    </TouchableOpacity>
                )
            }}
            />
            <Tab.Screen name="newLog" component={newLog}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TouchableOpacity 
                        onPress={() => {
                            // navigation.navigate("newLog")
                            // console.log('before ' + currentScreen)

                            if (currentScreen == "newLog")
                            {
                                navigation.goBack()
                                setCurrentScreen(navigation.getState().routeNames[0])
                            } else {
                                navigation.navigate("newLog")
                                setCurrentScreen("newLog")
                            }
                            // console.log('after ' + currentScreen)

                        }}
                        activeOpacity={1}
                        >
                        <View 
                        style={{
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: 35,
                            backgroundColor: '#0165EC',
                        }}
                        // onPress={() => {
                        //     console.log('here')
                        //     navigation.navigate('newHome')
                        // }}
                        > 
                            <Image
                                source={require('../assets/icons/Plus.png')}
                                resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#ffffff',
                                    transform: focused ? [{rotate: '45deg'}] : [{rotate: '0deg'}]
                                }}
                        />
                        </View>
                        </TouchableOpacity>
                    ),
                    tabBarButton: (props) => (
                        <MiddleTabButton {... props} />
                    ),
                }}
            /> 
            <Tab.Screen name="friends" component={Friends} options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TouchableOpacity
                        onPress={() => {
                            // console.log('before ' + currentScreen)
                            navigation.navigate("friends")
                            setCurrentScreen("friends")
                            // console.log('after ' + currentScreen)
                        }}
                        >
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image 
                                    source={require('../assets/icons/People.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? '#212629' : '#AAAAAA',
                                        margin: 5,
                                    }}
                                />
                                <Text style={{color: focused ? '#212629' : '#AAAAAA', fontSize:10, fontWeight:'600'}}>
                                    FRIENDS
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    ),
                }}/>
        </Tab.Navigator>
    );
}

export default Tabs;