import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import {Button} from "../../components/Button";
import { useNavigation, useRoute } from '@react-navigation/core';


interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😁'
}

export function Confirmation() {
    const navigation = useNavigation()
    const route = useRoute();

    const {
         title,
         subtitle,
         buttonTitle,
         icon,
         nextScreen,
    } = route.params as Params;

    function handleMoveOn() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}> {subtitle} </Text>                
                <View style={{width: '100%', paddingHorizontal: 70}}>
                    <Button title={buttonTitle} 
                        onPress={handleMoveOn} 
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
      },
      subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
      },
      
});