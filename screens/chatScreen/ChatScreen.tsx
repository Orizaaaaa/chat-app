import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { firestoreDB } from '../../config/firebase.config'

const ChatScreen = ({ route }: any) => {

    // pages detail yang mengambil dari params halaman homescreen lewat route
    const { room } = route.params
    const navigation: any = useNavigation()
    const [loading, setLoading] = useState(false)

    // message
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const user = useSelector((state: any) => state.user.userList);
    const sendMessage = async () => {
        const timeStamp = serverTimestamp()
        const id = ` ${Date.now()}`
        const _doc = {
            _id: id,
            roomId: room._id,
            timeStamp: timeStamp,
            message: message,
            user: user
        }
        setMessage('')
        await addDoc(collection(firestoreDB, 'chats', room._id, 'messages'), _doc)
            .then(() => { })
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        const msgQuery = query(collection(firestoreDB, 'chats', room._id, 'messages'),
            orderBy('timeStamp', 'asc'));
        const unsubscribe = onSnapshot(msgQuery, (querySnapshot) => {
            const updateMessage: any = querySnapshot.docs.map(doc => doc.data())
            setMessageList(updateMessage);
            setLoading(false)
        })
        return unsubscribe
    }, []);

    // open emoji
    // const textInputRef = useRef<HTMLInputElement>(null);
    // const handleKyboardOpen = () => {
    //     if (textInputRef.current) {
    //         textInputRef.current.focus()
    //     }
    // }



    return (
        <View className='flex-1' >
            <View className='w-full  bg-primary px-4 pb-6 flex-[0.3]' >
                <View className='flex-row items-center justify-between w-full px-1 py-10' >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome5 name="chevron-left" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View className='flex-row items-center justify-center space-x-3' >
                        <View className='h-12 w-12 rounded-full border border-white flex items-center justify-center' >
                            <FontAwesome5 name="users" size={24} color="#fff" />
                        </View>
                        <View>
                            <Text className='text-gray-50 text-base font-semibold capitalize' >{room.chatName.length > 16 ? `${room.chatName.slice(0, 16)}..`
                                : room.chatName} {" "}</Text>
                            <Text className='text-gray-50 text-base font-semibold capitalize' >online</Text>
                        </View>
                    </View>

                    <View className='flex-row items-center justify-center space-x-3' >
                        <TouchableOpacity>
                            <FontAwesome5 name="video" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome5 name="phone" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="dots-three-vertical" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View className='w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10' >
                <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={160} >

                    <ScrollView>
                        {loading ?
                            (<View className='w-full flex items-center justify-center' >
                                <ActivityIndicator size={'large'} color={'#43C651'} />
                            </View>)
                            :
                            (

                                <>
                                    {messageList.map((items: any, i) => items.user.providerData.email === user.providerData.email ?
                                        (
                                            <View className='m-1' key={i}>

                                                {/* message */}
                                                <View style={{ alignSelf: 'flex-end' }} className='px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary 
                                                w-auto relative' >
                                                    <Text className='text-base font-semibold text-white' >{items.message}</Text>
                                                </View>

                                                {/* time */}
                                                <View style={{ alignSelf: 'flex-end' }} >
                                                    {items.timeStamp && items.timeStamp.seconds && (
                                                        <Text className='text-[12px] text-black font-semibold'>
                                                            {new Date(parseInt(items.timeStamp.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: true
                                                            })}
                                                        </Text>
                                                    )}

                                                </View>
                                            </View>
                                        ) :
                                        (

                                            <View className='flex items-center justify-center space-x-2' key={i} style={{ alignSelf: 'flex-start' }}>
                                                <View className='flex-row items-center justify-center space-x-2' >
                                                    <Image className='h-12 w-12' source={{ uri: items.user.profilePic }} resizeMode='cover' />

                                                    <View className='m-1' >

                                                        {/* message */}
                                                        <View className='px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-gray-200 
                                                        w-auto relative' >
                                                            <Text className='text-base font-semibold text-black' >{items.message}</Text>
                                                        </View>

                                                        {/* time */}
                                                        <View style={{ alignSelf: 'flex-start' }} >
                                                            {items.timeStamp && items.timeStamp.seconds && (
                                                                <Text className='text-[12px] text-black font-semibold' >{new Date(parseInt(items.timeStamp.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    hour12: true
                                                                })}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    )}
                                </>
                            )}
                    </ScrollView>

                    <View className='w-full flex-row items-center justify-center px-7 pt-2' >
                        <View className='bg-gray-200 rounded-2xl space-x-4 px-4 flex-row items-center justify-center ' >
                            <TouchableOpacity >
                                <Entypo name="emoji-happy" size={20} color="#555" />
                            </TouchableOpacity>

                            <TextInput className='flex-1 h-8  text-base text-primaryText font-semibold'
                                placeholder='Type Here...' placeholderTextColor={'#999'} value={message} onChangeText={(e) => setMessage(e)} />

                            <TouchableOpacity>
                                <Entypo name="mic" size={20} color="#43C651" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={sendMessage} className='pl-4' >
                            <FontAwesome name="send" size={20} color="#555" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </View>
        </View>
    )
}

export default ChatScreen