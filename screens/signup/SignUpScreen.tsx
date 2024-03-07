import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import UserInput from '../../components/UserInput'
import { useNavigation } from '@react-navigation/native'
import { avatars } from '../../utils/utils'
import { MaterialIcons } from '@expo/vector-icons'

const SignUpScreen = () => {
    const navigation: any = useNavigation();
    const screenWidth = Math.round(Dimensions.get("window").width)

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleChange = (name: string, text: string) => {
        setFormData({ ...formData, [name]: text });
    };

    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url)
    return (
        <ScrollView className='h-full bg-white' >
            <View className='flex-1 items-center justify-start' >
                <Image className='h-80' source={require('../../assets/images/bg.png')} resizeMode='cover' style={{ width: screenWidth }} />
                <View className='w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6' >
                    <Image className='w-16 h-16 ' resizeMode='contain' source={require('../../assets/images/logo.png')} />
                    <Text className='text-primaryText text-3xl font-semibold' > Join with us! </Text>

                    <View className='w-full flex items-center justify-center relative -my-4' >
                        <TouchableOpacity className='w-20 h-20 rounded-full border-2 bg-primary relative border-green-400' >
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
                        <UserInput placeholder='Email' value={formData.email} onChangeText={(text) => handleChange('email', text)} isPass={false} />
                    </View>

                    <View className='w-full flex items-center justify-center' >
                        <UserInput placeholder='Password' value={formData.password} onChangeText={(text) => handleChange('password', text)} isPass={true} />
                    </View>

                    <TouchableOpacity className='w-full px-4 py-2 rounded-2xl my-3 bg-primary flex items-center justify-center  ' >
                        <Text className='py-2 text-lg text-white' >
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <View className='flex w-full pt-5 flex-row items-center justify-center space-x-2' >
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