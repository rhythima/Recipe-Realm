import { useLayoutEffect,useContext, useState } from 'react'
import {View,Text, ScrollView, Image,StyleSheet, Pressable} from 'react-native'
import List from '../components/MealDetail/List'
import Subtitle from '../components/MealDetail/Subtitle'
import MealDetails from '../components/MealDetails'
import { MEALS } from '../data/dummy-data'
import IconButton from '../components/IconButton'
import { FavoritesContext } from '../store/context/favorites-context'
import { Colors } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import FavoriteAnimation from '../components/FavoriteAnimation'

function MealDetailScreen({route,navigation}){

    const favoriteMealCtx = useContext(FavoritesContext)
    // console.log(favoriteMealCtx)
    const mealId = route.params.mealId
    const selectedMeal = MEALS.find(meal => meal.id === mealId)
    // console.log(selectedMeal)
    const mealIsFavorite = favoriteMealCtx.ids.includes(mealId)
    console.log(mealIsFavorite)
    const [showAnimation, setShowAnimation] = useState(false)

    function changeFavoritesStatusHandler(){
        if(mealIsFavorite){
            favoriteMealCtx.removeFavorite(mealId)
        }else{
            favoriteMealCtx.addFavorite(mealId)
            setShowAnimation(true)
        }
    }

    function headerButtonPressHandler() {
        // ... existing favorite logic ...
    }

    function cravingPressHandler() {
        navigation.navigate('Craving', {
            mealId: mealId,
            mealTitle: selectedMeal.title
        });
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return <IconButton icon={mealIsFavorite?'star':'star-outline'} color="white" onPress={changeFavoritesStatusHandler}/>
            }
        })
    },[navigation,changeFavoritesStatusHandler])
    return <View style={styles.container}>
        <FavoriteAnimation
            visible={showAnimation}
            onAnimationFinish={() => setShowAnimation(false)}
        />
        <ScrollView>
            <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <View style={styles.buttonContainer}>
                <Pressable 
                    style={({pressed}) => [
                        styles.cravingButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={cravingPressHandler}
                >
                    <View style={styles.buttonContent}>
                        <Ionicons name="restaurant" size={24} color="white" />
                        <Text style={styles.buttonText}>Find Nearby</Text>
                    </View>
                </Pressable>
            </View>
            <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients}/>
                <Subtitle>Steps</Subtitle>
                <List data={selectedMeal.steps}/>
            </View>
            </View>
        </ScrollView>
    </View>
}

export default MealDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image:{
        width:"100%",
        height:350
    },
    title:{
        fontWeight:"bold",
        fontSize:24,
        color:"white",
        textAlign:"center",
        margin:8
    },
    detailText:{
        color:"white"
    },
    listOuterContainer:{
        alignItems:"center"
    },
    listContainer:{
        width:"90%"
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 16,
    },
    cravingButton: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
    },
})