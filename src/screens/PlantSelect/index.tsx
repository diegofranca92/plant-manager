import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, FlatList, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Header } from './../../components/Header';
import { EnviromentButton } from './../../components/EnviromentButton';
import api from './../../services/api';

interface EnvProps {
    key: string;
    title: string;
}

export function PlantSelect(){
    const navigation = useNavigation();

    const [envPlant, setEnvPlant] = useState<EnvProps[]>([]);
  
    useEffect(() => {
        async function getEnviroment() {
            const { data } = await api.get('plants_environments')
            setEnvPlant(data)
            
        }

        getEnviroment();
    }, [])

      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente </Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList 
                    data={envPlant}
                    renderItem={({ item }) => (
                        <EnviromentButton title={item.title} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        height: 40, 
                        justifyContent: 'center',
                        paddingBottom: 5,
                        marginLeft: 32,
                        marginVertical: 32
                    }}
                />
            </View>
        </View>
        
      )
  }
  
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-around'
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    }
  })