import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';
import { TouchableOpacity } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter"

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})

        setGroupedItemsInBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView className="mt-6">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                <View> 
                    <Text className="text-lg font-bold text-center">Basket</Text>
                    <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>

                    <TouchableOpacity onPress={navigation.goBack}
                    className="rounded-full bg-gray-100 absolute top-3 right-5">
                        <XCircleIcon color="#00CCBB" height={50} width={50}/>
                    </TouchableOpacity>
     
      </View>

      <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
        <Image source={{
            uri: "https://links.papareact.com/wru"
        }}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
        <Text className="flex-1">Delivery in 50 - 70 min</Text>
        <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="divide-y divide-gray-200">
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center bg-white space-x-3 py-2 px-5">
                <Text>{items.length} x</Text>
                <Image source={{ uri: urlFor(items[0]?.image).url()}}
                className="h-12 w-12 rounded-full"/>
                <Text className="flex-1">{items[0]?.name}</Text>

                <Text className="text-gray-600">
                    <Currency quantity={items[0]?.price} currency="GBP"/>
                </Text>

                <TouchableOpacity>
                    <Text className="text-green" onPress={() => dispatch(removeFromBasket({ id: key}))}>Remove</Text>
                </TouchableOpacity>

            </View>
        ))}
      </ScrollView>

            <View className="p-5 mt-5 space-y-4 bg-white">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400">
                        <Currency quantity={basketTotal} currency="GBP"/>
                    </Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Delivery fee</Text>
                    <Text className="text-gray-400">
                        <Currency quantity={5.99} currency="GBP"/>
                    </Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400">
                        <Currency quantity={basketTotal + 5.99} currency="GBP"/>
                    </Text>
                </View>

                <TouchableOpacity className="rounded-lg flex-1 bg-[#00CCBB] p-4" onPress={() => navigation.navigate('PreperingOrderScreen')}>
                    <Text className="text-center text-white font-bold">Place Order</Text>
                </TouchableOpacity>

            </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen