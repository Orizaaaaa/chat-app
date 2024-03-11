import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';

const AddToChatScreen = () => {
    const navigation: any = useNavigation()
    const user = useSelector((state: any) => state.user.userList);
    const [addChat, setAddChat] = useState('')
    console.log(addChat);

    const createNewChat = async () => {
        let id = `${Date.now()}`
        const _doc = {
            _id: id,
            user: user,
            chatName: addChat
        }

        if (addChat !== '') {
            setDoc(doc(firestoreDB, 'chats', id), _doc)
                .then(() => {
                    setAddChat('')
                    navigation.replace('home')
                })
                .catch((err) => {
                    console.log(err);
                })

        }
    }


    return (
        <View className='flex-1' >
            <View className='w-full  bg-primary px-4 py-6 flex-[0.3]' >
                <View className='flex-row items-center justify-between w-full px-4 py-10' >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View className='flex-row items-center justify-center space-x-3' >
                        <Image className='w-12 h-12' source={{ uri: user.profilePic }} resizeMode='contain' />
                    </View>
                </View>
            </View>

            <View className='w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10' >
                <View className='w-full p-4' >
                    <View className='w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3' >
                        <Ionicons name='chatbubbles' size={24} color={'#777'} />

                        <TextInput className='flex-1 text-lg text-primaryText h-12 w-full'
                            placeholder='Create a chat' placeholderTextColor={'#999'}
                            value={addChat} onChangeText={(e: any) => setAddChat(e)} />

                        <TouchableOpacity onPress={createNewChat}>
                            <FontAwesome name='send' size={24} color={'#777'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddToChatScreen