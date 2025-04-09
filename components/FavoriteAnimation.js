import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

function FavoriteAnimation({ visible, onAnimationFinish }) {
  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3)).current;
  const foodItemsOpacity = useRef(new Animated.Value(0)).current;
  const foodPosition1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const foodPosition2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const foodPosition3 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const foodPosition4 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const foodRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset values
      opacity.setValue(0);
      scale.setValue(0.3);
      foodItemsOpacity.setValue(0);
      foodPosition1.setValue({ x: 0, y: 0 });
      foodPosition2.setValue({ x: 0, y: 0 });
      foodPosition3.setValue({ x: 0, y: 0 });
      foodPosition4.setValue({ x: 0, y: 0 });
      foodRotation.setValue(0);

      // Start animations
      Animated.sequence([
        // Fade in and scale up heart
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
        
        // Animate food items flying out
        Animated.parallel([
          Animated.timing(foodItemsOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(foodPosition1, {
            toValue: { x: -100, y: -100 },
            duration: 700,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
            useNativeDriver: true,
          }),
          Animated.timing(foodPosition2, {
            toValue: { x: 100, y: -100 },
            duration: 700,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
            useNativeDriver: true,
          }),
          Animated.timing(foodPosition3, {
            toValue: { x: -100, y: 100 },
            duration: 700,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
            useNativeDriver: true,
          }),
          Animated.timing(foodPosition4, {
            toValue: { x: 100, y: 100 },
            duration: 700,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
            useNativeDriver: true,
          }),
          Animated.timing(foodRotation, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        
        // Fade out everything
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animation complete
        if (onAnimationFinish) {
          onAnimationFinish();
        }
      });
    }
  }, [visible]);

  if (!visible) return null;

  // Convert rotation value to rotation string
  const spin = foodRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.overlay}>
      {/* Main heart icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Ionicons name="heart" size={80} color="#FF6B6B" />
      </Animated.View>

      {/* Flying food items */}
      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodItemsOpacity,
            transform: [
              { translateX: foodPosition1.x },
              { translateY: foodPosition1.y },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Ionicons name="pizza-outline" size={30} color="#FF6B6B" />
      </Animated.View>

      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodItemsOpacity,
            transform: [
              { translateX: foodPosition2.x },
              { translateY: foodPosition2.y },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Ionicons name="fast-food-outline" size={30} color="#FF6B6B" />
      </Animated.View>

      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodItemsOpacity,
            transform: [
              { translateX: foodPosition3.x },
              { translateY: foodPosition3.y },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Ionicons name="restaurant-outline" size={30} color="#FF6B6B" />
      </Animated.View>

      <Animated.View
        style={[
          styles.foodItem,
          {
            opacity: foodItemsOpacity,
            transform: [
              { translateX: foodPosition4.x },
              { translateY: foodPosition4.y },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Ionicons name="cafe-outline" size={30} color="#FF6B6B" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1000,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  foodItem: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default FavoriteAnimation; 