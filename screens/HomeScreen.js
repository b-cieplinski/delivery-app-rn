import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    //This here disables the header on each screen. The header is the default banner on the top of each screen of an app telling the users, where they are.
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
      sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`).then(data => {
        setFeaturedCategories(data)
      })
    }, [])
  return (
    <SafeAreaView>

      <View className=" flex-row pb-3 items-center mx-4 space-x-2">
        <Image 
            source={{
                uri: 'https://links.papareact.com/wru'
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"/> 
            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                <Text className="font-bold text-xl">Current Location <ChevronDownIcon size={20} color="#00CCBB"/></Text>
            </View>
            <UserIcon size={35} color="#00CCBB"/>
      </View>
            <View>
              {/* Search */}
              <View className="flex-row items-center space-x-2 pb-3 mx-4">
                <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-md">
                <SearchIcon color="gray" size={20}/>
                <TextInput placeholder="Type thing" keyboardType="default"/>
                </View>
                <AdjustmentsIcon color="#00CCBB"/>
              </View>
            </View>

            <ScrollView className="bg-gray-200"
            contentContainerStyle
            >
              {/* Category */}
             <Categories/>
             {/* Featured Row*/}

             {featuredCategories?.map(category => (
                    <FeaturedRow
                    key={category._id}
                      id={category._id}
                      title={category.name}
                      description={category.short_description}
/>             ))}

            </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen