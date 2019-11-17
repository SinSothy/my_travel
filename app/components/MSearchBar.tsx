import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Input, Icon, withTheme } from 'react-native-elements';
import { renderNode, nodeType } from 'react-native-elements/src/helpers';

const defaultSearchIcon = (theme: any) => ({
	type: 'material',
	size: 18,
	name: 'search',
	color: theme.colors.grey3,
});

const defaultClearIcon = (theme: any) => ({
	type: 'material',
	size: 18,
	name: 'clear',
	color: theme.colors.grey3,
});

interface Props {
	value?: string,
	clearIcon?: nodeType,
	searchIcon?: nodeType,
	loadingProps?: object,
	showLoading?: boolean,
	containerStyle?: ViewStyle,
	leftIconContainerStyle?: ViewStyle,
	rightIconContainerStyle?: ViewStyle,
	inputContainerStyle?: ViewStyle,
	inputStyle?: TextStyle,
	onClear?: () => void,
	onFocus?: () => void,
	onBlur?: () => void,
	onChangeText?: () => void,
	placeholderTextColor?: string,
	lightTheme?: boolean,
	round?: boolean,
	theme?: object,
}

interface State {
	isEmpty: boolean,
}

const defaultProps = {
	value: '',
	loadingProps: {},
	showLoading: false,
	lightTheme: false,
	round: false,
	onClear: () => {},
	onFocus: () => {},
	onBlur: () => {},
	onChangeText: () => {}
};

class SearchBar extends React.Component<Props, State> {
	static defaultProps = defaultProps;
	constructor(props: Props) {
		super(props);
		const { value } = props;
		this.state = {
			isEmpty: value ? value === '' : true,
		};
	}

	focus = () => {
		this.input.focus();
	};

	blur = () => {
		this.input.blur();
	};

	clear = () => {
		this.input.clear();
		this.onChangeText('');
		this.props.onClear();
	};

	onFocus = () => {
		this.props.onFocus();
		this.setState({ isEmpty: this.props.value === '' });
	};

	onBlur = () => {
		this.props.onBlur();
	};

	onChangeText = (text: string) => {
		this.props.onChangeText(text);
		this.setState({ isEmpty: text === '' });
	};

	render() {
		const { theme, ...rest } = this.props;

		const {
			lightTheme,
			round,
			clearIcon = defaultClearIcon(theme),
			containerStyle,
			searchIcon = defaultSearchIcon(theme),
			leftIconContainerStyle,
			rightIconContainerStyle,
			inputContainerStyle,
			inputStyle,
			showLoading,
			loadingProps,
			placeholderTextColor = theme.colors.grey3,
			...attributes
		} = rest;

		const { isEmpty } = this.state;
		const { style: loadingStyle, ...otherLoadingProps } = loadingProps;

		return (
			<View
				style={StyleSheet.flatten([
					styles.container(theme),
					lightTheme && styles.containerLight(theme),
					containerStyle,
				])}
			>
				<Input
					testID="searchInput"
					{...attributes}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onChangeText={this.onChangeText}
					ref={input => {
						this.input = input;
					}}
					placeholderTextColor={placeholderTextColor}
					inputStyle={StyleSheet.flatten([
						styles.inputStyle(theme),
						inputStyle,
					])}
					inputContainerStyle={StyleSheet.flatten([
						styles.inputContentContainer(theme),
						lightTheme && styles.inputContentContainerLight(theme),
						round && styles.round,
						inputContainerStyle,
					])}
					containerStyle={styles.inputContainer}
					leftIcon={renderNode(Icon, searchIcon, defaultSearchIcon(theme))}
					leftIconContainerStyle={StyleSheet.flatten([
						styles.leftIconContainerStyle,
						leftIconContainerStyle,
					])}
					rightIcon={
						<View style={{ flexDirection: 'row' }}>
							{showLoading && (
								<ActivityIndicator
									key="loading"
									style={StyleSheet.flatten([{ marginRight: 5 }, loadingStyle])}
									{...otherLoadingProps}
								/>
							)}

							{
								renderNode(Icon, clearIcon, {
									...defaultClearIcon(theme),
									key: 'cancel',
									onPress: this.clear,
								})}
						</View>
					}
					rightIconContainerStyle={StyleSheet.flatten([
						styles.rightIconContainerStyle,
						rightIconContainerStyle,
					])}
				/>
			</View>
		);
	}
}

const styles = {
	container: (theme: any) => ({
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		borderTopColor: '#000',
		padding: 8,
		backgroundColor: theme.colors.grey0,
	}),
	rightIconContainerStyle: {
		marginRight: 8,
	},
	leftIconContainerStyle: {
		marginLeft: 8,
	},
	containerLight: (theme: any) => ({
		borderTopColor: '#e1e1e1',
		borderBottomColor: '#e1e1e1',
		backgroundColor: theme.colors.grey5,
	}),
	inputContainer: {
		paddingHorizontal: 0,
	},
	inputStyle: theme => ({
		color: theme.colors.grey3,
		marginLeft: 10,
	}),
	inputContentContainer: theme => ({
		borderBottomWidth: 0,
		borderRadius: 3,
		overflow: 'hidden',
		minHeight: 30,
		backgroundColor: theme.colors.searchBg,
	}),
	inputContentContainerLight: (theme: any) => ({
		backgroundColor: theme.colors.grey4,
	}),
	round: {
		borderRadius: 15,
	},
};

export { SearchBar };
export default withTheme(SearchBar, 'SearchBar');