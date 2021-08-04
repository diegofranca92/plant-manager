import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "./../theme/colors";
import { Welcome } from './../screens/Welcome';
import { UserIdentification } from './../screens/UserIdentification';
import { Confirmation } from './../screens/Confirmation';
import { PlantDetails } from "./../screens/PlantDetails";
import { MyPlants } from "./../screens/MyPlants";
import AuthRoutes from "./tab.routes";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
        cardStyle: {
            backgroundColor: colors.white
        }
    }}
    >
        <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}
        />

         <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen 
            name="PlantSelect"
            component={AuthRoutes}
        />

        <stackRoutes.Screen 
            name="PlantDetails"
            component={PlantDetails}
        />

        <stackRoutes.Screen 
            name="MyPlants"
            component={AuthRoutes}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;