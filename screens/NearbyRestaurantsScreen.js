import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Update the DUMMY_RESTAURANTS object with more data
const DUMMY_RESTAURANTS = {
  'm1': [ // Spaghetti with Tomato Sauce
    {
      id: 'r1',
      name: "Luigi's Italian",
      distance: '0.8 km',
      price: '$15.99',
      rating: 4.5,
      address: '123 Main St',
    },
    {
      id: 'r2',
      name: 'Pasta Paradise',
      distance: '1.2 km',
      price: '$12.99',
      rating: 4.2,
      address: '456 Food Ave',
    },
    {
      id: 'r3',
      name: 'Bella Italia',
      distance: '2.0 km',
      price: '$18.99',
      rating: 4.7,
      address: '789 Italian Blvd',
    },
  ],
  'm2': [ // Schnitzel
    {
      id: 'r4',
      name: 'German Delights',
      distance: '1.5 km',
      price: '$18.99',
      rating: 4.7,
      address: '321 Euro St',
    },
    {
      id: 'r5',
      name: 'Schnitzel House',
      distance: '0.9 km',
      price: '$16.99',
      rating: 4.4,
      address: '654 Vienna Ave',
    },
  ],
  'm3': [ // BBQ Burger
    {
      id: 'r6',
      name: 'Burger Joint',
      distance: '0.3 km',
      price: '$12.99',
      rating: 4.6,
      address: '111 Burger St',
    },
    {
      id: 'r7',
      name: 'Grill Master',
      distance: '1.7 km',
      price: '$14.99',
      rating: 4.8,
      address: '222 BBQ Road',
    },
  ],
  'm4': [ // Wiener Schnitzel
    {
      id: 'r8',
      name: 'Austrian Kitchen',
      distance: '2.1 km',
      price: '$19.99',
      rating: 4.9,
      address: '333 Vienna St',
    },
    {
      id: 'r9',
      name: 'European Flavors',
      distance: '1.4 km',
      price: '$17.99',
      rating: 4.3,
      address: '444 Euro Ave',
    },
  ],
};

function RestaurantCard({ restaurant }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="restaurant-outline" size={40} color="#FF6B6B" />
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{restaurant.distance}</Text>
          </View>
          <View style={styles.info}>
            <Ionicons name="pricetag-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{restaurant.price}</Text>
          </View>
        </View>
        <Text style={styles.address}>{restaurant.address}</Text>
      </View>
    </View>
  );
}

function NoRestaurantsFound() {
  return (
    <View style={styles.noResultsContainer}>
      <Ionicons name="restaurant-outline" size={64} color="#ccc" />
      <Text style={styles.noResultsText}>No restaurants found nearby</Text>
      <Text style={styles.noResultsSubtext}>Try searching in a different area</Text>
    </View>
  );
}

function NearbyRestaurantsScreen({ route }) {
  const { mealId, mealTitle } = route.params;
  const restaurants = DUMMY_RESTAURANTS[mealId] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurants serving {mealTitle}</Text>
      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        <NoRestaurantsFound />
      )}
    </View>
  );
}

export default NearbyRestaurantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  address: {
    color: '#999',
    fontSize: 14,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
});
