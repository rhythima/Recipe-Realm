import { 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { View, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/theme';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Image 
          source={require('../assets/drawer-header.png')} // You'll need to add this image
          style={styles.headerImage}
        />
      </View>
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  drawerItems: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 10,
  },
}); 