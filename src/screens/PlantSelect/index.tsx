import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, FlatList, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Header } from './../../components/Header';
import { EnviromentButton } from './../../components/EnviromentButton';
import { CardPlantPrimary } from './../../components/CardPlantPrimary';
import api from './../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

import { Load } from './../../components/Load';

interface EnvProps {
    key: string;
    title: string;
}

interface PlantProps {
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

export function PlantSelect(){
    const navigation = useNavigation();

    const [envPlant, setEnvPlant] = useState<EnvProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [envPlantSelected, setEnvPlantSelected] = useState('all');
  
    const [loading, setLoading] = useState(true);

    function handleEnvPlantSelected( plantENV:string ) {
        setEnvPlantSelected(plantENV)

        if (plantENV == 'all') 
            return setFilteredPlants(plants)
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(plantENV)
        )

        setFilteredPlants(filtered)
    }

    useEffect(() => {
        async function getEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvPlant([{
                key: 'all',
                title: 'Todos',                
            }, ...data])
            
        }

        getEnviroment();
    }, [])

    useEffect(() => {
        async function getPlants() {
            const { data } = await api.get('plants?_sort=name&_order=asc')
            setPlants(data)
            setFilteredPlants(data)
            setLoading(false)
           
        }

        getPlants();
    }, [])

    if (loading) 
        return <Load />
  
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
                        <EnviromentButton 
                        title={item.title} 
                        active={item.key === envPlantSelected }
                        onPress={() => handleEnvPlantSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        height: 40,
                        justifyContent: 'center',
                        paddingBottom: 5,
                        marginLeft: 32,
                        marginVertical: 32,
                        paddingRight: 32
                    }}
                />

            </View>
            <ScrollView 
            contentContainerStyle={{justifyContent: 'center', paddingHorizontal: 32}}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <CardPlantPrimary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </ScrollView>
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
    },
  })