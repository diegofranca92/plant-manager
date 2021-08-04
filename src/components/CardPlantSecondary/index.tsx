import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {SvgFromUri} from 'react-native-svg'

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export const CardPlantSecondary = ({data, ...props} : PlantProps ) => {
    return(
        <RectButton style={styles.card} {...props}>
            <SvgFromUri 
                uri={data.photo} 
                width={70} 
                height={70} 
            />
            <Text style={styles.title}>
                {data.name}
            </Text>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.label}>
                    Regar às
                </Text>
                <Text style={styles.hour}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}


const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
      },
      title: {
          flex: 1,
          color: colors.heading,
          fontFamily: fonts.heading,
          marginLeft: 10,
          fontSize: 17
      },
      label: {
        color: colors.body_light,
        fontFamily: fonts.heading,
    },
      hour: {
        marginTop: 5,
        color: colors.body_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
        fontSize: 16
    },
})