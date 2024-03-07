import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import UserInput from '../../components/UserInput'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

    const navigation: any = useNavigation();
    const screenWidth = Math.round(Dimensions.get("window").width)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (name: string, text: string) => {
        setFormData({ ...formData, [name]: text });
    };

    return (
        <ScrollView>
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

                    <TouchableOpacity className='w-full px-4 py-2 rounded-2xl my-3 bg-primary flex items-center justify-center  ' >
                        <Text className='py-2 text-lg text-white' >
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    <View className='flex w-full py-12 flex-row items-center justify-center space-x-2' >
                        <Text> Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                            <Text className='text-primaryBold ' >Create Here</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default LoginScreen