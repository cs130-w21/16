import React, {Component} from 'react';
import { Animated, Easing, Platform, Text, TextInput, View } from 'react-native';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Header, Icon, SearchBar } from 'react-native-elements';

import {COLOR, IconToggle} from 'react-native-material-ui';

import colors from '../config/colors';

class LeftElement extends Component{
    render(){
        const{onSearchPress, onSearchClear, isSearchActive, searchValue, onSearchClose} = this.props;

        //if(isSearchActive && searchValue.length ===0){
        //    return null;
        //}

        const iconProps = {};

        if(isSearchActive && searchValue.length>0){
            iconProps.name='search';
            iconProps.color = 'yellow';
            iconProps.onPress = onSearchClear;
        } else {
            iconProps.name = 'search';
            iconProps.color = 'white';
            iconProps.onPress = onSearchPress;
        }

        return(
            <Icon {...iconProps}/>
        );
    }
}

class RightElement extends Component{
    constructor(props, context){
        super(props, context);
        this.state={
            rightElement:'map',
            spinValue: new Animated.Value(0),
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isSearchActive && !this.props.isSearchActive){
            this.animate({toValue:1, rightElement:'close'});
        }
        if(!nextProps.isSearchActive && this.props.isSearchActive){
            this.animate({toValue:0, rightElement: 'map'});
        }
    }
    animate = ({toValue, rightElement}) => {
        Animated.timing(this.state.spinValue, {
            toValue: 0.5,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({rightElement});

            Animated.timing(this.state.spinValue, {
                toValue,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }
    render(){
        const {rightElement, spinValue} = this.state;
        const {isSearchActive, onSearchClose} = this.props;
        const spin = this.state.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '180deg']
        });
        return(
            <Animated.View style={[styles.container, {transform: [{rotate: spin}] }]}>
                <Icon 
                    name={rightElement}
                    color={isSearchActive ? 'yellow': 'white'}
                    onPress={onSearchClose}
                />
            </Animated.View>
            
        );
    }
}
/*
class CenterElement extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            textInput: props.isSearchActive,
            opacityValue: new Animated.Value(1)
        };
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isSearchActive !== nextProps.isSearchActive){
            this.animateElements(nextProps.isSearchActive);
        }
    }
    animateElements = (nextIsSearchActive) => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({
                textInput: nextIsSearchActive
            });
            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android'
            }).start();
        });
    }
    render() {
        const{title, onSearchTextChange, searchValue, isSearchActive} = this.props;
        const{opacityValue, textInput} = this.state;
        const color = isSearchActive ? 'grey' : 'white';

        let content = <Text style={[styles.title, { color }]}>{title}</Text>;

        if(textInput){
            content = (<SearchBar/>);//<TextInput {...this.props}/>);
        }

        return(
            <Animated.View style={[styles.container, {opacity: 1}]}>
                {content}
            </Animated.View>
        );
    }
}*/

class NavBarComponent extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {isSearchActive: false, searchValue:""};
    }

    onSearchPressed = () => {
        this.setState({isSearchActive: true});
        console.log("Search is active");
    }
    onSearchTextChanged = (searchValue) => {
        this.setState({searchValue});
        console.log("Search text changed");
    }
    onSearchClearPressed = () => {
        this.onSearchTextChanged('');
        console.log("Search cleared");
    }
    onSearchClosed = () => {
        this.setState({isSearchActive: false, searchValue: ""});
        console.log("Search closed");
    }

    render(){
        const{isSearchActive, searchValue} = this.state;

        return(
            <View style={[styles.container, isSearchActive&&{backgroundColor: 'white'}]}>
                <Header
                    containerStyle={styles.header}
                    leftComponent={<LeftElement
                        isSearchActive={isSearchActive}
                        onSearchPress={this.onSearchPressed}
                        searchValue={searchValue}
                        onSearchClear={this.onSearchClearPressed}
                    />}
                    //centerComponent={<Text style={styles.title}>POTLUCK</Text>}
                    centerComponent={<SearchBar
                        placeholder="Search..."
                        onChangeText={this.onSearchTextChanged}
                        value={searchValue}
                        lightTheme
                        round
                        containerStyle={{
                            backgroundColor:'transparent',borderBottomColor:'transparent',borderTopColor:'transparent',
                            width: '100%', height: '50%'
                        }}
                        inputContainerStyle={{backgroundColor:'white'}}
                    />}
                    /*
                    centerComponent={<CenterElement
                        title="POTLUCK"
                        isSearchActive={isSearchActive}
                        onSearchTextChange={this.onSearchTextChanged}
                        searchValue={searchValue}
                    />}
                    */

                    rightComponent={<RightElement
                        isSearchActive={isSearchActive}
                        onSearchClose={this.onSearchClosed}
                        searchValue={searchValue}
                        onSearchClear={this.onSearchClearPressed}
                    />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        position: 'absolute',
        justifyContent: 'flex-start'
    },
    title: {
        color: '#fff', fontFamily:'Avenir', fontWeight:'bold', fontSize:20
    },
    container:{
        flex: 1
    }
});

export default NavBarComponent;