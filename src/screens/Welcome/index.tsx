import React, { useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import wateringImg from '../../assets/watering.png';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
  const navigation = useNavigation()

  const [show, setShow] = useState(true)

  function toggleShow() {
    setShow(true)
  }
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
          <Text style={styles.title}>Gerencie { '\n'} suas plantas de{ '\n'} forma fácil</Text>
          { show &&
            <Image style={styles.image} source={wateringImg} resizeMode="contain"/>
          }
          <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => (
            navigation.navigate("UserIdentification")
          )}>
            <Text>
            <Feather name="chevron-right" color="white" style={{fontSize: 28}} />
            </Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
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
    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
      fontFamily: fonts.text,
    },
    image: {
     height: Dimensions.get('window').width * 0.7 
    },
    button: {
      marginTop: 38,
      backgroundColor: colors.green,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      marginBottom: 10,
      height: 56,
      width: 56
    },
})