import React, { Fragment, Component } from 'react';
import { ImageBackground, StyleSheet, View, FlatList, Image, ScrollView } from 'react-native';
import { Header, Text } from 'react-native-elements';
import Images from '../utils/Images';

const myTripList = [
	{ title: 'My First Visit to Copenhagen', subtitle: 'Copenhagen, Denmark', date: '2019/12/01', background: Images.background4 },
	{ title: 'Best of Madrid in Two Days', subtitle: 'Madrid, Spain', date: '2019/12/01', background: Images.background5 },
];

interface Props {
	navigation?: any,
}

class MyTripDetailScreen extends Component<Props> {
	static navigationOptions: () => { header: null; };

	renderMyTripItem = ({ item }: any) => {
		return (
			<View style={styles.imageBackgroundItemContainer}>
				<Image borderRadius={10} source={item.background} style={styles.imageBackgroundItem} />
			</View>
		)
	}

	render() {
		return (
			<Fragment>
				<ImageBackground source={Images.background7} style={styles.imageBackground}>
					<Header
						leftContainerStyle={styles.headerLeftContainer}
						leftComponent={<Text style={styles.headerLeftText}>Trip Detail</Text>}
						centerContainerStyle={styles.headerCenterContainer}
						rightComponent={{ icon: 'md-arrow-back', type: 'ionicon', color: '#000000', size: 30, onPress: () => { this.props.navigation.goBack(); } }}
						containerStyle={{ backgroundColor: 'transparent' }}
					/>
					<View style={styles.container}>
						<Text style={[styles.title, styles.paddingVertical16]}>Copenhagen, Denmark</Text>
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item: any, index: number) => 'key' + index}
							data={myTripList}
							renderItem={this.renderMyTripItem}
						/>
					</View>
				</ImageBackground>
				<View style={styles.descriptionContainer}>
					<ScrollView>
						<Text style={styles.title}>My First Visit To Copenhagen</Text>
						<Text style={styles.subtitle}>Duis vestibulum elit - vel 2019</Text>
						<Text style={[styles.subtitle, styles.paddingVertical16]}>Duis vestibulum elit vel neque pharetra vulputate. Quisque scelerisque nisi urna. Duis rutrum non risus in imperdiet.</Text>
						<Image borderRadius={5} source={Images.background8} style={styles.imageContent} />
						<Text style={[styles.subtitle, styles.paddingVertical16]}>Proin molestie accumsan nulla sit amet mattis. Ut vel tristique neque. Praesent purus eros, aliquet sit amet venenatis in, sodales in odio. Curabitur ac ligula et purus cursus vulputate accumsan sit amet erat. Vestibulum ac mauris ut nisl maximus porta eu a libero. In hac habitasse platea dictumst. Proin augue urna, pretium vel mauris sed, lobortis rutrum libero.</Text>
					</ScrollView>
				</View>
			</Fragment>
		);
	}
}

MyTripDetailScreen.navigationOptions = () => ({
	header: null,
});

export default MyTripDetailScreen;

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
		height: 400,
	},
	paddingVertical16: {
		paddingVertical: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		paddingHorizontal: 16,
	},
	subtitle: {
		fontSize: 16,
		color: '#bbbbbb',
		paddingHorizontal: 16,
	},
	imageBackgroundItemContainer: {
		shadowColor: '#bbbbbb',
		shadowRadius: 15,
		shadowOffset: { width: 1, height: 15 },
		shadowOpacity: 1
	},
	imageBackgroundItem: {
		width: 200,
		height: 100,
		marginHorizontal: 16,
		marginVertical: 44,
	},
	descriptionContainer: {
		position: 'absolute',
		top: 320,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent'
	},
	imageContent: {
		width: null,
		height: 200,
		marginHorizontal: 16,
	}
});