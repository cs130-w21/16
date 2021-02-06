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
        const {navigation} = this.props;
        return(
            <Icon 
                name='search' 
                color='white' 
                onPress={() => {
                    console.log("SEARCH");
                    navigation.navigate('Search');
                }}/>
        );
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
                leftComponent={<LeftElement navigation={this.props.navigation}/>}
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