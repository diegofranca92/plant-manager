import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../../theme/colors';

interface ButtonProps extends TouchableOpacityProps {
    title?: string | JSX.Element;
}

export function Button ({title, ...props}: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button}
        {...props}>
            <Text style={styles.text}> {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 38,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
      },
      text: {
          color: colors.white
      }
})