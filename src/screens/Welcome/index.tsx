import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import wateringImg from '../../assets/watering.png';
import colors from '../../theme/colors';

export function Welcome(){
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Gerencie { '\n'} suas plantas { '\n'}de forma fácil</Text>
          <Image style={styles.image} source={wateringImg} resizeMode="contain"/>
          <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
          </Text>
          <TouchableOpacity style={styles.button}>
              <Text> > </Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
      fontSize:32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading,
      marginTop: 38
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading
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
    image: {
     width: 292,
     height: 284 
    }
})