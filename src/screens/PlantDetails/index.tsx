import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, ActivityIndicator, Platform, Alert } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {Button} from "../../components/Button";

import {SvgFromUri} from 'react-native-svg'
import gotaImg from "../../assets/waterdrop.png";
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from 'date-fns';

interface Params {
    plant: {
        id:number;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
        times: number;
        repeat_every: string;
    }
    }
}

export function PlantDetails() {

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const route = useRoute();
    const { plant } = route.params as Params;
    
    // o sinal _ serve pra omitir / dizer que não ira usar a variavel ou qualquer outra coisa
    function handleChangeTime(_:Event, dateTime: Date | undefined) {
        if (Platform.OS == 'android') {
            // Funciona como um toggle - Se tiver off fica on e virse-versa
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data no futuro! ⏰')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    return (
        <>
            <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between', backgroundColor: colors.shape}}>
                <View style={{
                    flex: 1, 
                    paddingHorizontal: 30,
                    paddingVertical: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.shape
                }}>
                    <SvgFromUri 
                        uri={plant.photo}
                        width={150} 
                        height={150} 
                    />
                    <Text style={{
                        fontFamily: fonts.heading,
                        fontSize: 21,
                        color: colors.heading,
                        marginTop: 15
                    }}
                    >
                        {plant.name}
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.text,
                        fontSize: 17,
                        color: colors.heading,
                        marginTop: 10
                    }}>
                        {plant.about}
                    </Text>
                </View>
            </ScrollView>
            <View style={{
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: getBottomSpace() || 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.blue_light,
                    padding: 20,
                    borderRadius: 20,
                    position: 'relative',
                    bottom: 60
                }}>
                    <Image source={gotaImg} style={{height: 56, width: 56}} />
                    <Text style={{
                        flex: 1,
                        marginLeft: 20,
                        fontFamily: fonts.text,
                        fontSize: 17,
                        color: colors.blue,
                        textAlign: 'justify'
                    }}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={{
                    textAlign: 'center', 
                    alignItems: 'center', 
                    color: colors.heading, 
                    fontSize: 12,
                    fontFamily: fonts.complement,
                    marginBottom: 5
                }}>
                Ecolha o melhor horário para ser lembrado:
                </Text>
                { showDatePicker &&(
                    <DateTimePicker 
                        value={selectedDateTime} 
                        mode='time' 
                        display='spinner' 
                        onChange={handleChangeTime} 
                    />
                )
                }

                {
                    Platform.OS == 'android' && (
                        <TouchableOpacity style={{
                            width: '100%',
                            alignItems: 'center',
                            paddingVertical: 40
                        }} 
                        onPress={() => setShowDatePicker(oldState => ! oldState)}
                        >

                        <Text style={{
                            color: colors.heading,
                            fontSize: 24,
                            fontFamily: fonts.text
                        }}>
                            {`Mudar Horário: ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                        </TouchableOpacity>
                    )
                }
                <Button title="Cadastrar Planta" />
            </View>

            
        </>
    )
}