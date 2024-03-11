import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { firebaseAuth, firestoreDB } from '../../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { setUser } from '../../redux/action/userAction'

const SplashScreen = () => {
    const navigation: any = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        checkLoggedUser()
    }, []);
    const checkLoggedUser = async () => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred?.uid) {
                // take data from firestore pass to redux
                getDoc(doc(firestoreDB, 'users', userCred.uid))
                    .then(docSnap => {
                        if (docSnap.exists()) {
                            console.log('user data : ', docSnap.data());
                            dispatch(setUser(docSnap.data()));
                        }
                    })
                    .then(() => {
                        setTimeout(() => {
                            navigation.navigate('home')
                        }, 2000)

                    })
            } else {
                navigation.navigate('login')
            }
        })
    }

    return (
        <View className='flex-1 items-center justify-center space-y-24' >
            <Image className='w-24 h-24' source={require('../../assets/images/logo.png')} resizeMode='contain' />
            <ActivityIndicator size={'large'} color={'#43C651'} />

        </View>
    )
}

export default SplashScreen