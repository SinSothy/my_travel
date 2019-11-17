import React, { Fragment, Component } from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Header, Text } from 'react-native-elements';
import Images from '../utils/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const myTripList = [
	{ title: 'My First Visit to Copenhagen', subtitle: 'Copenhagen, Denmark', date: '2019/12/01', background: Images.background4 },
	{ title: 'Best of Madrid in Two Days', subtitle: 'Madrid, Spain', date: '2019/12/01', background: Images.background5 },
	{ title: 'Spending time	in Marrakech', subtitle: 'Marrakech, Morocco', date: '2019/12/01', background: Images.background6 },
	{ title: 'My First Visit to Copenhagen', subtitle: 'Copenhagen, Denmark', date: '2019/12/01', background: Images.background4 },
	{ title: 'Best of Madrid in Two Days', subtitle: 'Madrid, Spain', date: '2019/12/01', background: Images.background5 },
];

interface Props {
	navigation?: any,
}

class MyTripScreen extends Component<Props> {
	static navigationOptions: () => { header: null; };

	renderMyTripItem = ({ item }: any) => {
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('MyTripDetail')}>
				<ImageBackground borderRadius={10} source={item.background} style={styles.imageBackground}>
					<View style={[styles.container, styles.justifyContentEnd]}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.subtitle}>{item.subtitle}</Text>
						<Text style={styles.subtitle}>{item.date}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<Fragment>
				<Header
					leftContainerStyle={styles.headerLeftContainer}
					leftComponent={<Text style={styles.headerLeftText}>My Trip</Text>}
					centerContainerStyle={styles.headerCenterContainer}
					rightComponent={{ icon: 'md-arrow-back', type: 'ionicon', color: '#000000', size: 30, onPress: () => { this.props.navigation.goBack() } }}
					containerStyle={{ backgroundColor: 'white' }}
				/>
				<View style={styles.container}>
					<FlatList
						keyExtractor={(item: any, index: number) => 'key' + index}
						data={myTripList}
						renderItem={this.renderMyTripItem}
						style={styles.myTripFlatList}
						contentContainerStyle={{
							paddingBottom: 16
						}}
					/>
				</View>
			</Fragment>
		);
	}
}

MyTripScreen.navigationOptions = () => ({
	header: null,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerLeftContainer: {
		flex: 3,
	},
	headerCenterContainer: {
		flex: 0,
	},
	headerLeftText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	imageBackground: {
		width: '100%',
		height: 200,
		marginVertical: 8,
	},
	myTripFlatList: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	justifyContentEnd: {
		padding: 16,
		justifyContent: 'flex-end',
	},
	title: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	subtitle: {
		color: '#ffffff',
		fontSize: 14,
	}
});

export default MyTripScreen;