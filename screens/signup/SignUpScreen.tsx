import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserInput from '../../components/UserInput'
import { useNavigation } from '@react-navigation/native'
import { avatars } from '../../utils/utils'
import { MaterialIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

const SignUpScreen = () => {
    const navigation: any = useNavigation();
    const screenWidth = Math.round(Dimensions.get("window").width)
    const screenHeight = Dimensions.get("window").height

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleChange = (name: string, text: string) => {
        setFormData({ ...formData, [name]: text });
    };

    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url)
    const [avatarMenu, setAvatarMenu] = useState(false)

    const handleAvatar = (item: any) => {
        setAvatarMenu(false)
        setAvatar(item.image.asset.url)
    }

    const [emailValidate, setEmailValidate] = useState(true)
    useEffect(() => {
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValidate(emailRegex.test(formData.email));
        }
    }, [formData.email]);



    return (
        <ScrollView className='h-full bg-white' >
            <View className='flex-1 items-center justify-start' >
                <Image className='h-80' source={require('../../assets/images/bg.png')} resizeMode='cover' style={{ width: screenWidth }} />

                {/* list of avatar section */}
                {avatarMenu && (
                    <>
                        <View className='absolute inset-0 z-10 w-full h-full '  >
                            <ScrollView>
                                <BlurView className='px-4 pb-20 flex-row flex-wrap items-center justify-evenly ' tint='dark' intensity={40}
                                    style={{ minHeight: screenHeight, minWidth: screenWidth, flex: 1 }}>
                                    {avatars?.map((item, index) => (
                                        <TouchableOpacity onPress={() => handleAvatar(item)} key={index} className='border-green-400 border-2 rounded-full relative w-20 h-20 m-3  ' >
                                            <Image source={{ uri: item.image.asset.url }} className='h-full w-full '
                                                resizeMode='contain' />
                                        </TouchableOpacity>
                                    ))}
                                </BlurView>
                            </ScrollView>
                        </View>
                    </>
                )}


                <View className='w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6' >
                    <Image className='w-16 h-16 ' resizeMode='contain' source={require('../../assets/images/logo.png')} />
                    <Text className='text-primaryText text-3xl font-semibold' > Join with us! </Text>

                    {/* main view */}
                    <View className='w-full flex items-center justify-center relative ' >
                        <TouchableOpacity className='w-20 h-20 rounded-full border-2 bg-primary relative border-green-400'
                            onPress={() => setAvatarMenu(true)} >

                            {/* avatar section  */}
                            <Image source={{ uri: avatar }} className='w-full h-full' resizeMode='contain' />
                            <View className='h-6 w-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center' >
                                <MaterialIcons name='edit' size={18} color={'white'} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Full Name' value={formData.fullName} onChangeText={(text) => handleChange('fullName', text)} isPass={false} />
                    </View>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Email' value={formData.email} onChangeText={(text) => handleChange('email', text)} isPass={false}
                            border={emailValidate ? 'border-gray-200' : 'border-red-500'} />
                    </View>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Password' value={formData.password} onChangeText={(text) => handleChange('password', text)} isPass={true} />
                    </View>

                    <TouchableOpacity className='w-full px-4 py-2 rounded-2xl  bg-primary flex items-center justify-center  ' >
                        <Text className='py-2 text-lg text-white' >
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <View className='flex w-full  flex-row items-center justify-center space-x-2' >
                        <Text> Have an account!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text className='text-primaryBold font-semibold' >Login Here</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen