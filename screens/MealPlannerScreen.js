import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MEALS } from '../data/dummy-data';

// Day meal plan component
function DayMealPlan({ day, meals, onPress }) {
  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayTitle}>{day}</Text>
        <Pressable onPress={onPress}>
          <Ionicons name="create-outline" size={20} color="#FF6B6B" />
        </Pressable>
      </View>

      {meals.map((meal) => (
        <View key={meal.id} style={styles.mealRow}>
          <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
          <View style={styles.mealInfo}>
            <Text style={styles.mealType}>{meal.mealType}</Text>
            <Text style={styles.mealTitle}>{meal.title}</Text>
            <View style={styles.mealMeta}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.mealMetaText}>{meal.duration}m</Text>
              <View style={styles.dot}></View>
              <Text style={styles.mealMetaText}>{meal.complexity}</Text>
            </View>
          </View>
        </View>
      ))}

      <Pressable 
        style={({pressed}) => [
          styles.addMealButton,
          pressed && styles.pressed
        ]}
      >
        <Ionicons name="add" size={18} color="#FF6B6B" />
        <Text style={styles.addMealText}>Add Meal</Text>
      </Pressable>
    </View>
  );
}

function MealPlannerScreen({ navigation }) {
  // Sample weekly meal plan data
  const weekPlan = [
    {
      id: 'day1',
      day: 'Monday',
      meals: [
        { ...MEALS[0], mealType: 'Breakfast' },
        { ...MEALS[1], mealType: 'Lunch' },
      ]
    },
    {
      id: 'day2',
      day: 'Tuesday',
      meals: [
        { ...MEALS[2], mealType: 'Breakfast' },
        { ...MEALS[3], mealType: 'Lunch' },
        { ...MEALS[4], mealType: 'Dinner' },
      ]
    },
    {
      id: 'day3',
      day: 'Wednesday',
      meals: [
        { ...MEALS[5], mealType: 'Lunch' },
      ]
    },
    {
      id: 'day4',
      day: 'Thursday',
      meals: []
    },
    {
      id: 'day5',
      day: 'Friday',
      meals: [
        { ...MEALS[6], mealType: 'Dinner' },
      ]
    },
    {
      id: 'day6',
      day: 'Saturday',
      meals: []
    },
    {
      id: 'day7',
      day: 'Sunday',
      meals: []
    },
  ];

  function handleEditDay(dayId) {
    // Navigate to edit screen (placeholder functionality)
    console.log('Edit day:', dayId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Meal Plan</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Meals Planned</Text>
          </View>
          <View style={styles.statDivider}></View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Days Prepared</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={weekPlan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DayMealPlan
            day={item.day}
            meals={item.meals}
            onPress={() => handleEditDay(item.id)}
          />
        )}
        contentContainerStyle={styles.planList}
      />

      <Pressable 
        style={({pressed}) => [
          styles.generateButton,
          pressed && styles.buttonPressed
        ]}
      >
        <Ionicons name="refresh" size={20} color="white" />
        <Text style={styles.generateButtonText}>Generate Weekly Plan</Text>
      </Pressable>
    </View>
  );
}

export default MealPlannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-around',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
  },
  planList: {
    padding: 16,
  },
  dayContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  mealInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  mealType: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealMetaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 4,
  },
  addMealText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonPressed: {
    opacity: 0.9,
    backgroundColor: '#e55c5c',
  },
}); 