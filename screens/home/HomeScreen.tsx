// HomeScreen.tsx
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/UserSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const user = useSelector((state: any) => state.user.userList);
    console.log('user : ', user);


    const navigate: any = useNavigation()
    return (
        <View className='flex-1  '>
            <SafeAreaView>
                <View className='w-full flex-row items-center justify-between px-4 py-2' >
                    <Image className='h-12 w-12' source={require('../../assets/images/logo.png')} resizeMode='contain' />
                    <TouchableOpacity className='w-12 h-12 rounded-full border border-green-500 flex items-center 
                    justify-center ' >
                        <Image className='h-12 w-12' source={{ uri: user.profilePic }} resizeMode='cover' />
                    </TouchableOpacity>
                </View>
                <Button title='clisk' onPress={() => navigate.navigate('login')}  ></Button>
            </SafeAreaView>
        </View >
    );
}
