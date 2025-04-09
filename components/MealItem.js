import {View,Text,Image,StyleSheet,Platform,Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MealDetails from './MealDetails'
import { COLORS, SHADOWS, FONTS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons'

function MealItem({title,id,imageUrl,affordability,complexity,duration}){

    const navgiation = useNavigation()
    function selectMealItemHandler(){
            navgiation.navigate('MealDetail',{mealId:id})
    }

    return <View style={styles.mealItem}>
        <Pressable
        android_ripple={{color:"#ccc"}}
        style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null
        ]}
        onPress={selectMealItemHandler}
        >
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri:imageUrl}} style={styles.image}/>
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.mealDetails}>
                        <View style={styles.detail}>
                            <Ionicons name="time-outline" size={18} color="#FF6B6B"/>
                            <Text style={styles.detailText}>{duration}m</Text>
                        </View>
                        <View style={styles.detail}>
                            <Ionicons name="restaurant-outline" size={18} color="#FF6B6B"/>
                            <Text style={styles.detailText}>{complexity.toUpperCase()}</Text>
                        </View>
                        <View style={styles.detail}>
                            <Ionicons name="pricetag-outline" size={18} color="#FF6B6B"/>
                            <Text style={styles.detailText}>{affordability.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    </View>
}

export default MealItem

const styles = StyleSheet.create({
    mealItem:{
        margin:16,
        borderRadius:16,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow:Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer:{
        borderRadius:16,
        overflow:"hidden"
    },
    imageContainer:{
        height: 200,
        width: '100%',
        overflow: 'hidden',
    },
    image:{
        width:"100%",
        height:200
    },
    details:{
        padding: 16,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        color: '#2D3436',
    },
    mealDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText:{
        color: '#636E72',
        fontSize: 14,
    },
})