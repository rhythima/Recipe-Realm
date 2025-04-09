import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabNavigation({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => setActiveTab('Meals')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={activeTab === 'Meals' ? 'restaurant' : 'restaurant-outline'} 
          size={24} 
          color={activeTab === 'Meals' ? '#FF6B6B' : '#777'} 
        />
        <Text style={[
          styles.tabLabel, 
          { color: activeTab === 'Meals' ? '#FF6B6B' : '#777' }
        ]}>
          Meals
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => setActiveTab('Discover')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={activeTab === 'Discover' ? 'compass' : 'compass-outline'} 
          size={24} 
          color={activeTab === 'Discover' ? '#FF6B6B' : '#777'} 
        />
        <Text style={[
          styles.tabLabel, 
          { color: activeTab === 'Discover' ? '#FF6B6B' : '#777' }
        ]}>
          Discover
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => setActiveTab('Planner')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={activeTab === 'Planner' ? 'calendar' : 'calendar-outline'} 
          size={24} 
          color={activeTab === 'Planner' ? '#FF6B6B' : '#777'} 
        />
        <Text style={[
          styles.tabLabel, 
          { color: activeTab === 'Planner' ? '#FF6B6B' : '#777' }
        ]}>
          Planner
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
}); 