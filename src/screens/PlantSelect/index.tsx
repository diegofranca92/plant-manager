import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
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
import { PlantProps } from '@app/libs/storage';

interface EnvProps {
    key: string;
    title: string;
}

export function PlantSelect(){
    const navigation = useNavigation();

    const [envPlant, setEnvPlant] = useState<EnvProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [envPlantSelected, setEnvPlantSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    function handleEnvPlantSelected( plantENV:string ) {
        setEnvPlantSelected(plantENV)

        if (plantENV == 'all') 
            return setFilteredPlants(plants)
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(plantENV)
        )

        setFilteredPlants(filtered)
    }

    function handleLoadMorePlants( distance:number ) {
        if(distance > 1)
            return;

        setLoadingMore(true);
        setPage(firstLoaded => firstLoaded + 1);
        getPlants();
    }

    async function getPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if(!data)
            return setLoading(true)
        
        if (page > 1) {
            setPlants(firstLoaded => [...firstLoaded, ...data])
            setFilteredPlants(firstLoaded => [...firstLoaded, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
            
        setLoading(false)
        setLoadingMore(false)
       
    }

    function handlePlantSelect(plant:PlantProps) {
        navigation.navigate('PlantDetails', {plant})
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
                    keyExtractor={(item) => String(item.key)}
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
                <FlatList 
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <CardPlantPrimary data={item} onPress={() => {handlePlantSelect(item)}} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEndPage }) => handleLoadMorePlants(distanceFromEndPage)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} size={32} />
                        : <></>
                    }
                    contentContainerStyle={{paddingHorizontal: 32}}
                />
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