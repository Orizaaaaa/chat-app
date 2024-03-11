import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebaseAuth, firestoreDB } from '../../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'

const SplashScreen = () => {
    const navigation: any = useNavigation()


    return (
        <View className='flex-1 items-center justify-center space-y-24' >
            <Image className='w-24 h-24' source={require('../../assets/images/logo.png')} resizeMode='contain' />
            <ActivityIndicator size={'large'} color={'#43C651'} />
        </View>
    )
}

export default SplashScreen