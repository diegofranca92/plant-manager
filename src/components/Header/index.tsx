import React, {useEffect, useState} from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImg from "../../assets/perfil.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {

    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function loadUserNameFromStorage() {
            const user = await AsyncStorage.getItem('@plantmanager:user')

            setUserName(user || '')
        }
        loadUserNameFromStorage()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
    }
  })