import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'

export default function HomeScreen() {
    const user = useSelector((state: any) => state.user)
    console.log('data anjing user : ', user);

    return (
        <View className='flex-1 justify-center items-center bg-red  ' >
            <Text className='text-black' >Open up App.tsx to start working on your app! babi HomeScreen </Text>
            <StatusBar style="auto" />
        </View>
    )
}

