import React, { useEffect, useState } from 'react';
import { Text, Image, FlatList, View, Alert} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import gotaImg from "../../assets/waterdrop.png";
import { loadPlant, PlantProps, removePlant } from '../../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CardPlantSecondary } from '../../components/CardPlantSecondary';

export function MyPlants() {

    const [myPlants, setMyPlants] =useState<PlantProps[]>([]);
    const [loading, setLoading] =useState(true);
    const [nextWaterd, setNextWaterd] =useState<string>();

    function handleRemove(plant:PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}`, [
            {
                text: 'Não',
                style: 'cancel',
            }, {
                text: 'Sim',
                onPress: async () => {
                    try {
                        
                        await removePlant(String(plant.id))
                        setMyPlants((oldData) => 
                            oldData.filter((item) => item.id !== plant.id)
                        )

                    } catch (error) {
                        Alert.alert('Não foi possivel remover')
                    }
                }
            }
        ])
    }
    
    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant()

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            )

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}.`
            )

            setMyPlants(plantsStoraged)
            setLoading(false)
        }
        if(myPlants === []) (<Text>Não possui plantas cadastradas</Text>)
        loadStorageData()
    }, [])

    useEffect(() => {

    }, [])

    if (loading) 
    return <Load />

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingTop: 30,
            backgroundColor: colors.background
        }}>
            <Header />

            <View style={{ flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.blue_light,
                    padding: 20,
                    borderRadius: 20,
                    height: 110,
                    }}>
                <Image source={gotaImg} style={{height: 60, width: 60}} />
                <Text style={{flex: 1, color: colors.blue, paddingHorizontal: 20}}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={{width: '100%', flex: 1}}>
                <Text 
                style={{
                    fontSize: 24,
                    fontFamily: fonts.heading,
                    color: colors.heading, 
                    marginVertical: 20
                }}>Próximas regadas</Text>
                <FlatList  
                    data={myPlants} 
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({item}) => (
                            <CardPlantSecondary data={item} handleRemove={() => handleRemove(item)} />
                        )} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>

        </View>
    )
    
}