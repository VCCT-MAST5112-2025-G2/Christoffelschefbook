import React from "react";
import { View, Text, Button, StyleSheet,Image, FlatList, TouchableOpacity } from "react-native";

const Mainmenu = [
    { id:'1',
        name:'Beef Welligton',
        Description:'A filet steak coated with mushroom duxelles and Parm ham, wrapped in puff pastry, and baked to perfection.',
        image: require('../assets/beefwellington.jpg'),
        price:''
    },

    { id:'2',
        name:'Lobster with Red Pepper Sauce',
        Description:'A luxurious combination of sweet lobster paired with cardamom infused jus and a vibrant red pepper sauce.',
        image: require('../assets/lobster.jpg'),
        price:''
    },

    { id:'3',
        name:'Elegant lobster bisque with foie gras',
        Description:'A lobster, cream and aromatic vegetables along with a decadent addition of foie gras.',
        image: require('../assets/lobsterbisque.jpg'),
        price:''
    },

    { id:'4',
        name:'Kaiseki Wagyu Sukiyaki',
        Description:'Thinly sliced Wagyu beef cooked in a savory-sweet broth with vegetables, tofu, and noodles, served in a traditional Japanese style.',
        image: require('../assets/kaiseki.jpg'),
        price:''
    },

    { id:'5',
        name:'Wagyu Steak',
        Description:'A premium cut of Wagyu beef, served with roasted vegetables.',
        Others:'charred asparagus, light salad with citrus vinaigrette, roasted potatoes ',
        image: require('../assets/wagyusteak.jpg'),
        price:''
    },

    { id:'6',
        name:'Herb-Crusted Rack of Lamb',
        Description:'A succulent rack of lamb coated with a fragrant herb crust, served with a red wine reduction and seasonal vegetables.',
        image: require('../assets/lamb.jpg'),
        price:''
    },

    { id:'7',
        name:'Classic Fish and Chips',
        Description:'Crispy battered fish served with golden fries, tartar sauce, and a wedge of lemon.',
        image: require('../assets/fishandchips.jpg'),
        price:''
    },
]
    

export default function HomepageSreen({navigation}) {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.Description}</Text>
                <Text style={styles.others}>{item.Others}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}>
                    <Text style={styles.buttonText}>View Recipe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Christoffel's Chef Book!</Text>
            <Text style={styles.subtitle}>Your personal recipe manager.</Text>
            <Button
                title="Get Started"
                onPress={() => navigation.navigate('Welcome')}
            />
              <FlatList
            data={Mainmenu}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />  
        </View>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
  },
});