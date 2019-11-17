import React, { ReactNode, Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

type Props = {
	categoryTitle: string,
	categorySeeAll: string,
	children?: ReactNode,
	onPress?: () => void,
}

const MListHeader = (props: Props) => {
	const { categoryTitle, categorySeeAll, children, onPress } = props;

	return (
		<Fragment>
			<View style={styles.categoryTitleContainer}>
				<Text style={styles.leftHeaderTitle}>{categoryTitle}</Text>
				<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
					<Text style={styles.rightHeaderTitle}>{categorySeeAll}</Text>
				</TouchableOpacity>
			</View>
			<View>
				{children}
			</View>
		</Fragment>
	);
}

MListHeader.defaultProps = {
	categoryTitle: '',
	categorySeeAll: '',
	onPress: () => {}
}

const styles = StyleSheet.create({
	categoryTitleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	leftHeaderTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	rightHeaderTitle: {
		fontSize: 18,
		color: '#bbbbbb',
	},
})

export default MListHeader;