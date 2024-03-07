import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type Props = {
    value: string
    placeholder?: string
    onChangeText: (text: string) => void
    isPass?: boolean
}

const UserInput = ({ value, placeholder, onChangeText, isPass }: Props) => {
    const [showPass, setShowPass] = useState(false)

    const icons = (placeholder: any) => {
        if (placeholder === 'Email') {
            return 'email'
        } else if (placeholder === 'Password') {
            return 'lock'
        }
    }
    return (
        <View className='border rounded-2xl px-4 py-6 flex-row items-center justify-between space-x-4  border-gray-200 '  >
            <MaterialIcons name={icons(placeholder)} size={24} color="gray" />
            <TextInput className='flex-1 text-base Text-PrimaryText' placeholder={placeholder} value={value} onChangeText={onChangeText}
                secureTextEntry={showPass} autoCapitalize='none' />

            {isPass &&
                <TouchableOpacity onPress={() => setShowPass(!showPass)} >
                    <Entypo name={showPass ? "eye" : "eye-with-line"} size={24} color="gray" />
                </TouchableOpacity>
            }
        </View>
    )
}

export default UserInput