import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MEALS } from '../data/dummy-data';

// Featured meal component
function FeaturedMeal({ item, onPress }) {
  return (
    <Pressable 
      onPress={onPress}
      style={({pressed}) => [
        styles.featuredItem,
        pressed && styles.pressed
      ]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.featuredImage} />
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <View style={styles.featuredMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{item.duration}m</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.metaText}>
              {Math.floor(Math.random() * 10) / 10 + 4.0}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// Trending cuisine component
function TrendingCuisine({ title, imageUrl, count, onPress }) {
  return (
    <Pressable 
      onPress={onPress}
      style={({pressed}) => [
        styles.cuisineItem,
        pressed && styles.pressed
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.cuisineImage} />
      <Text style={styles.cuisineTitle}>{title}</Text>
      <Text style={styles.cuisineCount}>{count} meals</Text>
    </Pressable>
  );
}

function DiscoverScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get random featured meals
  const featuredMeals = MEALS.slice(0, 5);
  
  // Trending cuisines data
  const trendingCuisines = [
    { 
      id: 'c1', 
      title: 'Italian', 
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      count: 12 
    },
    { 
      id: 'c2', 
      title: 'Asian', 
      imageUrl: 'https://cdn.pixabay.com/photo/2018/08/16/22/59/asia-3611406_1280.jpg',
      count: 8 
    },
    { 
      id: 'c3', 
      title: 'Mexican', 
      imageUrl: 'https://cdn.pixabay.com/photo/2016/09/15/19/24/tacos-1672251_1280.jpg',
      count: 6 
    }
  ];

  function handleMealPress(id) {
    navigation.navigate('MealDetail', { mealId: id });
  }

  function handleCuisinePress(cuisineId) {
    // This would filter meals by cuisine type
    // For now it just navigates to MealsOverview with a title
    navigation.navigate('MealsOverview', { 
      categoryId: 'c1', // placeholder
      title: trendingCuisines.find(cuisine => cuisine.id === cuisineId).title 
    });
  }

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={[1]} // Just need one item to render the header content
        keyExtractor={() => 'header'}
        renderItem={() => (
          <View>
            {/* Featured section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Meals</Text>
              <Pressable>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredMeals}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <FeaturedMeal 
                  item={item} 
                  onPress={() => handleMealPress(item.id)}
                />
              )}
              contentContainerStyle={styles.featuredList}
            />

            {/* Trending cuisines */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Cuisines</Text>
              <Pressable>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            
            <View style={styles.cuisineGrid}>
              {trendingCuisines.map((cuisine) => (
                <TrendingCuisine
                  key={cuisine.id}
                  title={cuisine.title}
                  imageUrl={cuisine.imageUrl}
                  count={cuisine.count}
                  onPress={() => handleCuisinePress(cuisine.id)}
                />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredItem: {
    width: 280,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cuisineItem: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cuisineImage: {
    width: '100%',
    height: 80,
  },
  cuisineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginHorizontal: 8,
  },
  cuisineCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.8,
  },
}); 