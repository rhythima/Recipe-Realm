import {View,Text,StyleSheet,Pressable,Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FOOD_ICONS = {
  'Italian': 'pizza-outline',
  'Quick & Easy': 'timer-outline',
  'Hamburgers': 'fast-food-outline',
  'German': 'beer-outline',
  'Light & Lovely': 'leaf-outline',
  'Exotic': 'globe-outline',
  'Breakfast': 'sunny-outline',
  'Asian': 'restaurant-outline',
  'French': 'wine-outline',
  'Summer': 'ice-cream-outline',
}

// Array of vibrant colors for categories
const CATEGORY_COLORS = [
  '#FF6B6B', // Coral red
  '#4ECDC4', // Turquoise
  '#FFE66D', // Yellow
  '#6C5CE7', // Purple
  '#A8E6CF', // Mint green
  '#FF8C94', // Pink
  '#45B7AF', // Teal
  '#96CEB4', // Sage
  '#FFEEAD', // Cream
  '#FF9999', // Light red
]

function CategoryGridTile({title,color,onPress}){
  // Get a color from our array based on the title length to ensure consistent colors
  const tileColor = CATEGORY_COLORS[title.length % CATEGORY_COLORS.length]
  
  return <View style={styles.gridItem}>
          <Pressable android_ripple={{color:'#ccc'}} onPress={onPress}
          style={({pressed}) =>[
              styles.button,
              pressed ? styles.buttonPressed:null
          ]}
          >
              <View style={[styles.innerContainer, {backgroundColor: tileColor}]}>
                  <View style={styles.iconContainer}>
                    <Ionicons 
                      name={FOOD_ICONS[title] || 'restaurant-outline'} 
                      size={32} 
                      color="white" 
                    />
                  </View>
                  <Text style={styles.title}>{title}</Text>
                  <View 
                    style={[
                      styles.decoration, 
                      { backgroundColor: 'rgba(255,255,255,0.2)' }
                    ]} 
                  ></View>
              </View>        
          </Pressable>
        
  </View>
}

export default CategoryGridTile

const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin:8,
        height:150,
        borderRadius:20,
        elevation:4,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        overflow:Platform.OS == 'android' ? "hidden":"visible"
    },
    innerContainer:{
        flex:1,
        padding:16,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        position: 'relative',
        overflow: 'hidden',
    },
    colorBar:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        height:6,
        borderTopLeftRadius:16,
        borderTopRightRadius:16
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        color:'white',
        textAlign:'center',
        marginTop:16
    },
    decoration:{
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        transform: [{ scale: 1.5 }],
    },
    circle:{
        width:40,
        height:40,
        borderRadius:20,
        opacity:0.3
    },
    button:{
        flex:1
    },
    buttonPressed:{
        opacity:0.5
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    }
})