/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import HomeScreen from './app/screen/HomeScreen';
import MyTripScreen from './app/screen/MyTripScreen';
import MyTripDetailScreen from './app/screen/MyTripDetailScreen';


const MainNavigator = createStackNavigator({
	Home: { screen: HomeScreen },
	MyTrip: { screen: MyTripScreen },
	MyTripDetail: { screen: MyTripDetailScreen }
},
{
	initialRouteName: 'Home'
});

const App = createAppContainer(MainNavigator);

export default App;
