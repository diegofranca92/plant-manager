import React from 'react';
import AppLoading from "expo-app-loading";
import Routes from "./src/routes";
import { useFonts, Jost_400Regular, Jost_600SemiBold } from "@expo-google-fonts/jost";
import * as Notifications from "expo-notifications";
import { PlantProps } from './src/libs/storage';


export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification  => {
        // retorna os dados da notificação
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )

    return () => subscription.remove()

    // async function notifications() {
    //   // remove todas as notificações agendadas
    //   await Notifications.cancelAllScheduledNotificationsAsync()

    //   // Pega todas as notificações agendadas
    //   const data = await Notifications.getAllScheduledNotificationsAsync()
    //   console.log('################################');
    //   console.log(data);
    // }

    // notifications()
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}