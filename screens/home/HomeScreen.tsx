// HomeScreen.tsx
import { View, Text, Button, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const user = useSelector((state: any) => state.user.userList);
    const navigate: any = useNavigation()

    // chats
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const chatQuery = query(collection(firestoreDB, 'chats'), orderBy('_id', 'desc'));
        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
            const chatRooms: any = querySnapshot.docs.map(doc => doc.data())
            setChats(chatRooms);
            setLoading(false)
        })

        return unsubscribe
    }, []);

    console.log(chats);

    return (
        <View className='flex-1'>
            <SafeAreaView>
                <View className='w-full flex-row items-center justify-between px-4 py-2' >
                    <Image className='h-12 w-12' source={require('../../assets/images/logo.png')} resizeMode='contain' />
                    <TouchableOpacity onPress={() => navigate.navigate('profile')} className='w-12 h-12 rounded-full border border-green-500 flex items-center 
                    justify-center ' >
                        <Image className='h-12 w-12' source={{ uri: user.profilePic }} resizeMode='cover' />
                    </TouchableOpacity>
                </View>
                <ScrollView className='w-full px-4 pt-4'>
                    <View className='w-full' >
                        <View className='w-full flex-row items-center justify-between px-2'>
                            <Text className='text-primaryText text-base font-extrabold pb-2' >
                                Messages
                            </Text>
                            <TouchableOpacity onPress={() => navigate.navigate('addToChat')} ><Ionicons name='chatbox' size={28} color={'#555'} /></TouchableOpacity>
                        </View>
                        {loading ?
                            <View className='w-full flex items-center justify-center' >
                                <ActivityIndicator size={'large'} color={'#43C651'} />
                            </View>
                            :
                            <>
                                {chats?.map((items, index) => (
                                    <MessageCard key={index} room={items} />
                                ))}
                            </>

                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View >
    );
}

const MessageCard = ({ room }: { room: any }) => {
    const navigate: any = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigate.navigate('chat', { room: room })} className='w-full flex-row items-center justify-start py-2' >
            <View className='h-16 w-16 rounded-full flex items-center justify-center border-2 border-green-500 p-1' >
                <FontAwesome5 name='users' size={24} color={'#555'} />
            </View>

            <View className='flex-1 flex items-start justify-center ml-4'>
                <Text className='text-primaryText text-base font-semibold capitalize' >{room.chatName}</Text>
                <Text className='text-primaryText text-sm' >Lorem ipsum dolor sit amet consectetur adipisicing elit ... </Text>
            </View>

            <Text className='text-primary px-4 text-base font-semibold' >27 min</Text>

        </TouchableOpacity>
    )
}