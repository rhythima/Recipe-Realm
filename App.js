import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Existing screens
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FavoritesContextProvider from './store/context/favorites-context';
import CravingScreen from './screens/CravingScreen';
import SplashScreen from './components/SplashScreen';

// New tab screens
import DiscoverScreen from './screens/DiscoverScreen';
import MealPlannerScreen from './screens/MealPlannerScreen';
import CustomTabNavigation from './components/CustomTabNavigation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Configuration for stack screens
const stackScreenOptions = {
  headerStyle: {
    backgroundColor: "#FF6B6B",
  },
  headerTintColor: "white",
  contentStyle: {
    backgroundColor: "#F5F5F5",
  },
  headerShadowVisible: false,
};

// Drawer navigator component
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF6B6B",
        },
        headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: "#F5F5F5",
        },
        drawerActiveTintColor: "#FF6B6B",
        drawerInactiveTintColor: "#555",
        drawerActiveBackgroundColor: "#FFE8E8",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Meals');

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  const MealsStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen 
        name="MealsCategories" 
        component={DrawerNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      <Stack.Screen 
        name="Craving" 
        component={CravingScreen} 
        options={{ title: "Nearby Restaurants" }}
      />
    </Stack.Navigator>
  );

  const DiscoverStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen 
        name="DiscoverScreen" 
        component={DiscoverScreen}
        options={{ title: "Discover" }}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
    </Stack.Navigator>
  );

  const PlannerStack = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen 
        name="MealPlanner" 
        component={MealPlannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );

  // Render the active tab content
  const renderContent = () => {
    switch(activeTab) {
      case 'Meals':
        return <MealsStack />;
      case 'Discover':
        return <DiscoverStack />;
      case 'Planner':
        return <PlannerStack />;
      default:
        return <MealsStack />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <View style={styles.content}>
              {renderContent()}
            </View>
            <CustomTabNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </View>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
