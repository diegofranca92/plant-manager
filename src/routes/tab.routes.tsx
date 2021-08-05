import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./../theme/colors";
import { PlantSelect } from "./../screens/PlantSelect";
import { MyPlants } from "./../screens/MyPlants";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 68
        }
      }}
    >
      <AppTab.Screen  
        name="Nova Planta" 
        component={PlantSelect} 
        options={{
          tabBarIcon: ( ({focused, size, color}) => (
            <MaterialIcons 
              name={focused ? 'add-circle' :'add-circle-outline'}
              size={size}
              color={color}
            />
          ))
        }}
      />
      <AppTab.Screen  
        name="Minhas Plantas" 
        component={MyPlants} 
        options={{
          tabBarIcon: (({focused, size, color}) => (
            <MaterialIcons 
              name={focused ? 'list-alt' :'format-list-bulleted'}
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes;