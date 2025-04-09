import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  // Animation values
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.3)).current;
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const foodAnim1 = useRef(new Animated.Value(0)).current;
  const foodAnim2 = useRef(new Animated.Value(0)).current;
  const foodAnim3 = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Overall animation sequence
    Animated.sequence([
      // Fade in and scale the logo
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),

      // Show title with a slight delay
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),

      // Show the first food item
      Animated.parallel([
        Animated.timing(foodAnim1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0.25,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Show the second food item
      Animated.parallel([
        Animated.timing(foodAnim2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Show the third food item
      Animated.parallel([
        Animated.timing(foodAnim3, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0.75,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Pause for a moment
      Animated.delay(500),

      // Fade out everything
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation complete, trigger the callback
      onFinish();
    });
  }, []);

  // Calculate rotation for circular food placement
  const rotateValue = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Food opacity animations
  const foodOpacity1 = foodAnim1;
  const foodOpacity2 = foodAnim2;
  const foodOpacity3 = foodAnim3;

  return (
    <View style={styles.container}>
      {/* Center logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnimation,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Ionicons name="restaurant" size={100} color="#FF6B6B" />
      </Animated.View>

      {/* Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleAnimation,
            transform: [
              {
                translateY: titleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        MealsApp
      </Animated.Text>

      {/* First food item */}
      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodOpacity1,
            transform: [
              {
                rotate: rotateValue,
              },
              {
                translateX: 120 * Math.cos(0 * Math.PI * 2),
              },
              {
                translateY: 120 * Math.sin(0 * Math.PI * 2),
              },
            ],
          },
        ]}
      >
        <Ionicons name="pizza" size={50} color="#FF9F1C" />
      </Animated.View>

      {/* Second food item */}
      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodOpacity2,
            transform: [
              {
                rotate: rotateValue,
              },
              {
                translateX: 120 * Math.cos(0.33 * Math.PI * 2),
              },
              {
                translateY: 120 * Math.sin(0.33 * Math.PI * 2),
              },
            ],
          },
        ]}
      >
        <Ionicons name="fast-food" size={50} color="#4ECDC4" />
      </Animated.View>

      {/* Third food item */}
      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodOpacity3,
            transform: [
              {
                rotate: rotateValue,
              },
              {
                translateX: 120 * Math.cos(0.66 * Math.PI * 2),
              },
              {
                translateY: 120 * Math.sin(0.66 * Math.PI * 2),
              },
            ],
          },
        ]}
      >
        <Ionicons name="cafe" size={50} color="#F25F5C" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
  },
  foodItem: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
}); 