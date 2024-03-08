import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type Props = {
    value: string
    placeholder?: string
    onChangeText: (text: string) => void
    isPass?: boolean
    border?: string;
}

const UserInput = ({ value, placeholder, onChangeText, isPass, border = 'border-gray-200' }: Props) => {
    const [showPass, setShowPass] = useState(true)
    const icons = (placeholder: any) => {
        if (placeholder === 'Email') {
            return 'email'
        } else if (placeholder === 'Password') {
            return 'lock'
        } else if (placeholder === 'Full Name') {
            return 'person'
        }
    }
    return (
        <View className={`border rounded-2xl px-4 py-6 flex-row items-center justify-between space-x-4  ${border}`}  >
            <MaterialIcons name={icons(placeholder)} size={24} color="gray" />
            <TextInput className='flex-1 text-base Text-PrimaryText' placeholder={placeholder} value={value} onChangeText={onChangeText}
                secureTextEntry={isPass ? showPass : undefined} autoCapitalize='none' />

            {isPass &&
                <TouchableOpacity onPress={() => setShowPass(!showPass)} >
                    <Entypo name={showPass ? "eye-with-line" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            }
        </View>
    )
}

export default UserInput