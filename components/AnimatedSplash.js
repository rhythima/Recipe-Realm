import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const foodImages = [
  require('../assets/food1.png'),  // You'll need to add these images to your assets folder
  require('../assets/food2.png'),
  require('../assets/food3.png'),
];

export default function AnimatedSplash({ onFinish }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,  // Reduced duration for faster fade in
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,  // Reduced duration for faster fade out
      useNativeDriver: true,
    }).start(callback);
  };

  useEffect(() => {
    fadeIn();
    
    const interval = setInterval(() => {
      fadeOut(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex === foodImages.length - 1) {
            clearInterval(interval);
            onFinish();
            return prevIndex;
          }
          fadeIn();
          return prevIndex + 1;
        });
      });
    }, 1000);  // Changed from 3000 to 1000 for 1-second intervals

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={foodImages[currentImageIndex]}
        style={[
          styles.image,
          {
            opacity: fadeAnim,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
}); 