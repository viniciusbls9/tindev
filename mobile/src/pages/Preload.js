import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator,  StyleSheet, View, Text } from 'react-native';

export default function Preload(props) {
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                props.navigation.navigate('Main', { user });
            } else {
                props.navigation.navigate('Login');
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#df4723" style={{marginBottom:20}} style={styles.load} />
            <Text>Carregando usuários...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    load: {
        marginBottom: 20
    }
})