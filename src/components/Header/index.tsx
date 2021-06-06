import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImg from "../../assets/perfil.png";

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Diego</Text>
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