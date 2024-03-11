// HomeScreen.tsx
import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/UserSlice';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const dispatch = useDispatch();

    const userList = useSelector((state: { user: { userList: string[] } }) => state.user.userList);
    console.log('ini data user: ', userList);

    const navigate: any = useNavigation()
    return (
        <View className='flex-1 justify-center items-center bg-red'>
            <Text className='text-black'>Open up App.tsx to start working on your app! babi HomeScreen</Text>
            <StatusBar style="auto" />
            <Button title='go to splash' onPress={() => navigate.navigate('splash')} />
        </View>
    );
}
