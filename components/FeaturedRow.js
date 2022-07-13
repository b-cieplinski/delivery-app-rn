import { View, Text, ScrollView } from 'react-native'
import React, { useEffect,  useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description, featuredCategory}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      },
    }[0]`, 
    { id }
    ).then(data => {
      setRestaurants(data?.restaurants)
    })
  }, [id])
  return (
    <View>
        <View className="flex-row items-center justify-between px-4 mt-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="black"/>
        </View>
    
    <Text className="text-xs text-gray-500 px-4">{description}</Text>

    <ScrollView horizontal
    contenctContainerStyle={{
        paddingHorizontal: 15,
    }}
    showsHorizontalScrollIndicator={false}
    className="pt-4">

      {restaurants?.map(restaurant => (
                <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                imgUrl={restaurant.image}
                title={restaurant.name}
                rating={restaurant.rating}
                genre={restaurant.type?.name}
                address={restaurant.address}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
                />
      ))} 
{/* 
<RestaurantCard
                key={123}
                id={123}
                imgUrl=""
                title="Yo Sushi"
                rating={3}
                genre="Polish"
                address="Polski Sklep"
                short_description="Super Sklep Polecam"
                dishes={[]}
                long={23}
                lat={12}
                /> */}



    </ScrollView>
    </View>
  )
}

export default FeaturedRow