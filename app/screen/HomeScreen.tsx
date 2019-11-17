import React, { Component, Fragment } from 'react';
import { Text, Header, Icon, ListItem } from 'react-native-elements';
import { StyleSheet, View, FlatList, ImageBackground, Image, Platform, Animated, TouchableOpacity } from 'react-native';
import MSearchBar from '../components/MSearchBar';
import MListHeader from '../components/MListHeader';
import { getStatusBarHeight } from '../utils/StatusBarHeight';
import Images from '../utils/Images';

const cityList = [
	{
		title: 'New York',
		subtitle: 'United States',
		background: Images.background1
	},
	{
		title: 'Sanghai',
		subtitle: 'China',
		background: Images.background2
	},
	{
		title: 'Sydney',
		subtitle: 'Australia',
		background: Images.background3
	}
];

const placeList = [
	{ background: Images.place1 },
	{ background: Images.place2 },
	{ background: Images.place3 },
];

const friendList = [
	{ avatar: Images.avatar1 },
	{ avatar: Images.avatar2 },
	{ avatar: Images.avatar3 },
	{ avatar: Images.avatar1 },
	{ avatar: Images.avatar2 },
	{ avatar: Images.avatar3 },
];

const headerHeight = Platform.select({
	android: 56,
	default: 44,
}) + getStatusBarHeight();

interface Props {
	navigation?: any,
}

class HomeScreen extends Component<Props> {
	static navigationOptions: () => { header: null; };

	state = {
		searchText: '',
		headerAnimated: new Animated.Value(0),
		searchBarAnimated: new Animated.Value(0),
	};

	onChangeTextSearchBar = (value: string) => {
		this.setState(() => ({
			searchText: value,
		}));
	}

	onSearchBarBlur = () => {
		Animated.parallel([
			Animated.timing(this.state.headerAnimated, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(this.state.searchBarAnimated, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			})
		]).start();
	}

	onSearchBarFocus = () => {
		Animated.parallel([
			Animated.timing(this.state.headerAnimated, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(this.state.searchBarAnimated, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			})
		]).start();
	}

	renderCitiesItem = ({ item }: any) => {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.itemContainer}
				onPress={() => this.props.navigation.navigate('MyTrip')}
			>
				<ImageBackground borderRadius={10} source={item.background} style={styles.imageBackground} />
				<ListItem
					title={item.title}
					subtitle={item.subtitle}
					titleStyle={styles.titleListStyle}
					subtitleStyle={styles.subtitleListStyle}
					containerStyle={styles.itemListContainer}
				/>
			</TouchableOpacity>
		);
	}

	renderPlaceItem = ({ item }: any) => {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.itemContainer}
				onPress={() => this.props.navigation.navigate('MyTrip')}
			>
				<Image borderRadius={10} source={item.background} style={styles.placeImage} />
			</TouchableOpacity>
		);
	}

	renderFriendItem = ({ item }: any) => {
		return (
			<View style={styles.itemContainer}>
				<Image borderRadius={30} source={item.avatar} style={styles.friendImage} />
			</View>
		);
	}

	render() {
		const headerTranslateY = this.state.headerAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -headerHeight],
		});

		const searchBarTranslateY = this.state.searchBarAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -headerHeight + getStatusBarHeight()],
		});


		return (
			<Fragment>
				<Animated.View style={{ transform: [{ translateY: headerTranslateY }] }}>
					<Header
						ViewComponent={Animated.View}
						leftContainerStyle={styles.headerLeftContainer}
						leftComponent={<Text style={styles.headerLeftText}>Explore Cities</Text>}
						centerContainerStyle={styles.headerCenterContainer}
						rightComponent={{ icon: 'menu', color: '#000000', size: 30 }}
						containerStyle={{ backgroundColor: 'white' }}
					/>
				</Animated.View>
				<Animated.View style={{ transform: [{ translateY: searchBarTranslateY }] }}>
					<MSearchBar
						containerStyle={styles.searchBarContainer}
						inputContainerStyle={styles.searchInputContainer}
						searchIcon={<Icon type='ionicon' name='md-search' size={30} color='#bbbbbb' />}
						rightIconContainerStyle={styles.searchBarIconContainer}
						leftIconContainerStyle={styles.searchBarIconContainer}
						clearIcon={<Icon type='ionicon' name='md-mic' size={30} color='#bbbbbb' />}
						onChangeText={this.onChangeTextSearchBar}
						value={this.state.searchText}
						onFocus={this.onSearchBarFocus}
						onBlur={this.onSearchBarBlur}
					/>
				</Animated.View>
				<Animated.ScrollView style={[styles.container, { transform: [{ translateY: searchBarTranslateY }] }]}>
					<MListHeader
						categoryTitle='Popular Cities'
						categorySeeAll='View all'
					>
						<FlatList
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item: any, index: number) => 'key' + index}
							horizontal={true}
							data={cityList}
							renderItem={this.renderCitiesItem}
							style={styles.countryFlatList}
						/>
					</MListHeader>
					<MListHeader
						categoryTitle='Trending Place'
						categorySeeAll='View all'
					>
						<FlatList
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item: any, index: number) => 'key' + index}
							horizontal={true}
							data={placeList}
							renderItem={this.renderPlaceItem}
							style={styles.countryFlatList}
						/>
					</MListHeader>
					<MListHeader
						categoryTitle='Travel with friends'
						categorySeeAll='View all'
					>
						<FlatList
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item: any, index: number) => 'key' + index}
							horizontal={true}
							data={friendList}
							renderItem={this.renderFriendItem}
							style={styles.countryFlatList}
						/>
					</MListHeader>
				</Animated.ScrollView>
			</Fragment>
		);
	}
}

HomeScreen.navigationOptions = () => ({
	header: null,
})

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
	searchBarContainer: {
		backgroundColor: '#ffffff',
		borderTopWidth: 0,
		borderBottomWidth: 0,
	},
	searchInputContainer: {
		backgroundColor: '#E8E8E8',
		height: 44,
		borderRadius: 20,
	},
	imageBackground: {
		width: 120,
		height: 270,
	},
	titleListStyle: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	subtitleListStyle: {
		fontSize: 12,
		color: '#bbbbbb',
	},
	itemListContainer: {
		backgroundColor: 'transparent',
		padding: 0,
		marginVertical: 4,
	},
	countryFlatList: {
		padding: 8
	},
	itemContainer: {
		marginHorizontal: 8
	},
	placeImage: {
		width: 150,
		height: 90,
	},
	friendImage: {
		width: 60,
		height: 60,
	},
	searchBarIconContainer: {
		paddingHorizontal: 8,
	}
})

export default HomeScreen;