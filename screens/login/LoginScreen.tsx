import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/UserInput'

const LoginScreen = () => {
    const screenWidth = Math.round(Dimensions.get("window").width)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (name: string, text: string) => {
        setFormData({ ...formData, [name]: text });
    };



    return (
        <View className='flex-1 items-center justify-start' >
            <Image className='h-96' source={require('../../assets/images/bg.png')} resizeMode='cover' style={{ width: screenWidth }} />
            <View className='w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6' >
                <Image className='w-16 h-16 ' resizeMode='contain' source={require('../../assets/images/logo.png')} />
                <Text className='text-primaryText text-3xl font-semibold' > Welcome Back! </Text>

                <View className='w-full flex items-center justify-center' >
                    <UserInput placeholder='Email' value={formData.email} onChangeText={(text) => handleChange('email', text)} isPass={false} />
                </View>

                <View className='w-full flex items-center justify-center' >
                    <UserInput placeholder='Password' value={formData.password} onChangeText={(text) => handleChange('password', text)} isPass={true} />
                </View>

            </View>
        </View>
    )
}

export default LoginScreen