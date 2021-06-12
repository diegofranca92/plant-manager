import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import {Button} from "../../components/Button";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function UserIdentification() {
    const navigation = useNavigation()

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false)
        console.log(isFocused);
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
        console.log(isFocused);
    }

    function handleInputChange(value:string) {
        setIsFilled(!!value);
        setName(value)
    }

    async function handleSubmit() {
        if(!name)
            return Alert.alert("Me diz como te chamar 😢")

        await AsyncStorage.setItem("@plantmanager:user", name)

        navigation.navigate("Confirmation")
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>{isFilled ? '😁' : '😊'}</Text>
                            <Text style={styles.title}>Como podemos{ '\n'} chamar você?</Text>
                            <TextInput 
                            style={[styles.input, (isFocused || isFilled) && {borderColor: colors.green}]} 
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                            />
                            <View style={{width: '100%', paddingHorizontal: 70}}>
                                <Button title="Confirmar" 
                                    onPress={handleSubmit} 
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        color: colors.heading,
        borderColor: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
      },
});