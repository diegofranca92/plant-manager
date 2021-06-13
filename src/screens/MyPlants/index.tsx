import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, ActivityIndicator, Platform, Alert } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {Button} from "../../components/Button";
import { Header } from '../../components/Header';

export function MyPlants() {

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

        </View>
    )
    
}