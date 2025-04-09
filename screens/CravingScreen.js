import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for restaurants
const DUMMY_RESTAURANTS = {
  'm1': [
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
  ],
  'm2': [
    {
      id: 'r3',
      name: 'German Delights',
      distance: '1.5 km',
      price: '$18.99',
      rating: 4.7,
      address: '789 Euro St',
    },
  ],
};

// Restaurant card component
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

function CravingScreen({ route }) {
  const { mealId, mealTitle } = route.params || { mealId: 'm1', mealTitle: 'this meal' };
  const restaurants = DUMMY_RESTAURANTS[mealId] || DUMMY_RESTAURANTS['m1'] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurants serving {mealTitle}</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export default CravingScreen;

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
}); 