// HomeScreen.tsx
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/UserSlice';

export default function HomeScreen() {
    const dispatch = useDispatch();

    const userList = useSelector((state: { user: { userList: string[] } }) => state.user.userList);
    console.log('ini data user: ', userList);

    return (
        <View className='flex-1 justify-center items-center bg-red'>
            <Text className='text-black'>Open up App.tsx to start working on your app! babi HomeScreen</Text>
            <StatusBar style="auto" />
        </View>
    );
}
