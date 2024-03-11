import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebaseAuth, firestoreDB } from '../../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/UserSlice'

const SplashScreen = () => {
    const dispatch = useDispatch()
    const navigation: any = useNavigation()

    useEffect(() => {
        let redirectTimeout: NodeJS.Timeout;
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred?.uid) {
                getDoc(doc(firestoreDB, 'users', userCred.uid))
                    .then(docSnap => {
                        if (docSnap.exists()) {
                            console.log('user data : ', docSnap.data());
                            dispatch(addUser(docSnap.data()));
                        }
                    });

                redirectTimeout = setTimeout(() => {
                    navigation.replace('home');
                }, 2000);

            } else {
                redirectTimeout = setTimeout(() => {
                    navigation.replace('login');
                }, 2000);
            }
        });

        return () => clearTimeout(redirectTimeout);
    }, []);



    return (
        <View className='flex-1 items-center justify-center space-y-24' >
            <Image className='w-24 h-24' source={require('../../assets/images/logo.png')} resizeMode='contain' />
            <ActivityIndicator size={'large'} color={'#43C651'} />
        </View>
    )
}

export default SplashScreen