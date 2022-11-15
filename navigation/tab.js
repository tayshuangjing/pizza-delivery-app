import Ionicons from 'react-native-vector-icons/Ionicons'
import AccountScreen from '../screens/AccountScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from '../const/colors';

const homeName = "Home";
const menuName = "Menu";
// const chatName = "Chat";
const accountName = "Account";

const Tab = createBottomTabNavigator();

const TabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn == homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn == menuName) {
                        iconName = focused ? 'pizza' : 'pizza-outline';
                    // } else if (rn == chatName) {
                    //     iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (rn == accountName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: COLORS.primary,
                inactiveTintColor: COLORS.grey,
                labelStyle: { fontFamily: "tr-regular", fontSize: 10 },
                style: { padding: 10, height: 70 }
            }}
        >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={menuName} component={MenuScreen} />
            {/* <Tab.Screen name={chatName} component={ChatScreen} /> */}
            <Tab.Screen name={accountName} component={AccountScreen} />
        </Tab.Navigator>
    )
}

export default TabScreen;