import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function testComponent(props){
    return(
        <View style={styles.container}>
            <Text>Test Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});