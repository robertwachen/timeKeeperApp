import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable } from 'react-native'


import Home from '../screens/Home'
import Friends from '../screens/Friends'
import Log from '../screens/Log'

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
    return (
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
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
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
                ),
            }}/>
            <Tab.Screen name="Log" component={Log}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: 35,
                            backgroundColor: '#0165EC'
                        }}> 
                            <Image
                                source={require('../assets/icons/Plus.png')}
                                resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#ffffff',
                                }}
                        />
                        </View>
                        
                    ),
                    tabBarButton: (props) => (
                        <MiddleTabButton {... props} />
                    )
                }}
            /> 
            <Tab.Screen name="Friends" component={Friends} options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
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
                    ),
                }}/>
        </Tab.Navigator>
    );
}

export default Tabs;