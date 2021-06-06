import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import {Button} from "../../components/Button";
import { useNavigation } from '@react-navigation/core';


export function Confirmation() {
    const navigation = useNavigation()


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>🤗</Text>
                <Text style={styles.title}>Prontinho</Text>
                <Text style={styles.subtitle}> Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>                
                <View style={{width: '100%', paddingHorizontal: 70}}>
                    <Button title="Começar" 
                        onPress={() => (
                        navigation.navigate("PlantSelect")
                        )} 
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