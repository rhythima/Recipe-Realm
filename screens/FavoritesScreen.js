import {useContext} from 'react'
import {Text,View,StyleSheet} from 'react-native'
import { MEALS } from '../data/dummy-data'
import { FavoritesContext } from '../store/context/favorites-context'
import MealsList from '../components/MealsList/MealsList'
import EmptyFavorites from '../components/EmptyFavorites'
import { Colors } from '../constants/colors'


function FavoritesScreen(){
    const favoriteMealsCtx = useContext(FavoritesContext)
    const favoriteMeals = MEALS.filter((meal) => favoriteMealsCtx.ids.includes(meal.id))
    if(favoriteMeals.length ==0){
        return <EmptyFavorites />
    }
    return <View style={styles.container}>
        <MealsList items={favoriteMeals}/>
    </View>
}

export default FavoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    rootContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:18,
        fontWeight:"bold",
        color:"white"
    }
})