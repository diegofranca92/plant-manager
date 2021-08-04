import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps, Swipeable } from "react-native-gesture-handler";
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {SvgFromUri} from 'react-native-svg'
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const CardPlantSecondary = ({data, handleRemove, ...props} : PlantProps ) => {
    return(
        <Swipeable
        overshootRight={false}
        renderRightActions={() => (
            <Animated.View>
                <View>
                    <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                        <Feather name='trash' size={32} color={colors.white} />
                    </RectButton>
                </View>
            </Animated.View>
        )}
        >
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
        </Swipeable>
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
    buttonRemove: {
        width: 100,
        height: 100,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
})