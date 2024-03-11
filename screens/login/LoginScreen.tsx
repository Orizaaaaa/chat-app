import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import UserInput from '../../components/UserInput'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, setUser } from '../../redux/action/userAction'
import Store from '../../redux/store'


const LoginScreen = () => {
    const navigation: any = useNavigation();
    const screenWidth = Math.round(Dimensions.get("window").width)
    const dispatch = useDispatch()


    // formData
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (name: string, text: string) => {
        setFormData({ ...formData, [name]: text });
    };

    // validation regex
    const [emailValidate, setEmailValidate] = useState(true)
    useEffect(() => {
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValidate(emailRegex.test(formData.email));
        }
    }, [formData.email]);

    const [alert, setAlert] = useState(false)


    // login with firebase
    const handleLogin = async () => {
        if (formData.email !== '') {
            await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
                .then((userCred) => {
                    if (userCred) {

                        // take data from firestore
                        getDoc(doc(firestoreDB, 'users', userCred.user.uid))
                            .then(docSnap => {
                                if (docSnap.exists()) {
                                    console.log('user data : ', docSnap.data());
                                    dispatch(setUser(docSnap.data()));
                                }
                            })
                    }
                })
                .catch((err) => {
                    // alert error 
                    console.log(err.message);
                    setAlert(true)
                    setInterval(() => {
                        setAlert(false)
                    }, 5000)
                })
        }
    }




    return (
        <ScrollView className='h-full bg-white' >
            <View className='flex-1 items-center justify-start' >
                <Image className='h-96' source={require('../../assets/images/bg.png')} resizeMode='cover' style={{ width: screenWidth }} />
                <View className='w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6' >
                    <Image className='w-16 h-16 ' resizeMode='contain' source={require('../../assets/images/logo.png')} />
                    <Text className='text-primaryText text-3xl font-semibold' > Welcome Back! </Text>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Email' value={formData.email} onChangeText={(text) => handleChange('email', text)} isPass={false}
                            border={emailValidate ? 'border-gray-200' : 'border-red-500'} />
                    </View>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Password' value={formData.password} onChangeText={(text) => handleChange('password', text)} isPass={true} />
                    </View>

                    {alert
                        ? (<View className='flex items-start w-full' >
                            <Text className='text-red-700 text-left' >Invalid email or password</Text>
                        </View>)
                        : null}

                    <TouchableOpacity onPress={handleLogin} className='w-full px-4 py-2 rounded-2xl my-3 bg-primary flex items-center justify-center  ' >
                        <Text className='py-2 text-lg text-white' >
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    <View className='flex w-full py-5 flex-row items-center justify-center space-x-2' >
                        <Text> Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                            <Text className='text-primaryBold font-semibold' >Create Here</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView >
    )
}

export default LoginScreen