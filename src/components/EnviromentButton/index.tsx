import React from 'react';
import { Text, StyleSheet  } from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title?: string | JSX.Element;
    active?: boolean;
}

export function EnviromentButton ({
    title,
    active = false,
    ...props
}: EnviromentButtonProps) {
    return (
        <RectButton style={[styles.button, active && styles.buttonActive]}
            {...props}
        >
            <Text style={[styles.text, active && styles.textActive]}> {title} </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.shape,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 10,
        height: 40,
        width: 76,
        marginRight: 5
      },
      buttonActive: {
        backgroundColor: colors.green_light,
      },
      text: {
          color: colors.heading,
          fontFamily: fonts.text
      },
      textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})