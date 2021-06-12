import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import LottieView from "lottie-react-native";

import loadAnimation from "../../assets/load.json";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export function Load() {
    return (
        <View style={styles.container}>
        <LottieView 
            source={loadAnimation}
            autoPlay
            loop
            style={styles.animation}
        />
        <Text style={styles.loadText}>Carregando { '\n'}suas Plantinhas...</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      animation: {
          backgroundColor: 'transparent',
          width: 200,
          height: 200,
      },
      loadText: {
        fontSize: 22,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.text,
        lineHeight: 34
      },
})