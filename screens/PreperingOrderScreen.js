import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import { useNavigation } from '@react-navigation/native'

const PreperingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 3000)
    })

  return (
<SafeAreaView className="mt-6 bg-[#00BBCC] flex-1 justify-center items-center">
<Animatable.Image
source={require("../assets/preperinggif.gif")}
animation="slideInUp"
iterationCount={1}
className="h-96 w-96"/>
</SafeAreaView>
  )
}

export default PreperingOrderScreen