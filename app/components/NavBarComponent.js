import React, {Component} from 'react';
import { Header, Icon } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

class RightElement extends Component{
    render(){
        return(
            <Icon name='filter-alt' color='white' onPress={() => {console.log("MAP")}}/>
        );
    }
}

class LeftElement extends Component{
    render(){
        const {navigation, search} = this.props;
        if(search == null){
            return(
                <Icon 
                    name='search' 
                    color='white' 
                    onPress={() => {
                        console.log("SEARCH");
                        navigation.navigate('Search');
                    }}/>
            );
        } else {
            return(
                <Icon 
                    name='arrow-left'
                    type='simple-line-icon'
                    color='white' 
                    onPress={() => {
                        console.log("SEARCH");
                        navigation.navigate('FeaturedMenuScreen');
                    }}/>
            );
        }
    }
}

class CenterElement extends Component{
    render() {
        return(
            <Text style={styles.title}>POTLUCK</Text>
        );
    }
}

class NavBarComponent extends Component{
    render(){
        return(
            <Header
                containerStyle={{backgroundColor: colors.primary}}
                leftComponent={<LeftElement navigation={this.props.navigation} search={this.props.search}/>}
                centerComponent={<CenterElement/>} 
                rightComponent={<RightElement/>}
                barStyle="light-content"
            />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white', fontFamily:'Avenir', fontWeight:'bold', fontSize:20
    }
});



export default NavBarComponent;