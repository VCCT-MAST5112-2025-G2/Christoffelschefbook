import React, {useState, useEffect} from "react";
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView} from "react-native";

const MainmenuData = [
    { id:'1',
        name:'Beef Welligton',
        Description:'A filet steak coated with mushroom duxelles and Parm ham, wrapped in puff pastry, and baked to perfection.',
        category:'Main',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/2d5df432941d8445a5a1d8f907281213'},
        price:'R450.00',
    },

    { id:'2',
        name:'Lobster with Red Pepper Sauce',
        Description:'A luxurious combination of sweet lobster paired with cardamom infused jus and a vibrant red pepper sauce.',
        category:'Starter',
      image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a76d7c64e51bdd000ff21db9696c643e'},
        price:'R350.00',
    },

    { id:'3',
        name:'Elegant lobster bisque with foie gras',
        Description:'A lobster, cream and aromatic vegetables along with a decadent addition of foie gras.',
        category:'Starter',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4011cbbd84f6c995147d45c285b451c8'},
        price:'R300.00',
    },

    { id:'4',
        name:'Kaiseki Wagyu Sukiyaki',
        Description:'Thinly sliced Wagyu beef cooked in a savory-sweet broth with vegetables, tofu, and noodles, served in a traditional Japanese style.',
        category:'Main',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/bc828779cdb78dc9e7061b012b9ab9cb'},
        price:'R250.00'
    },

    { id:'5',
        name:'Wagyu Steak',
        Description:'A premium cut of Wagyu beef, served with roasted vegetables.',
        Others:'charred asparagus, light salad with citrus vinaigrette, roasted potatoes ',
        category:'Main',
       image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/b2886313ed81cb039207487e9ebe7896'},
        price:'R350.00'
    },

    { id:'6',
        name:'Herb-Crusted Rack of Lamb',
        Description:'A succulent rack of lamb coated with a fragrant herb crust, served with a red wine reduction and seasonal vegetables.',
        category:'Main',
     image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/aaa66b5560d6bd24a17decac87151123'},
        price:'R300.00'
    },

    { id:'7',
        name:'Classic Fish and Chips',
        Description:'Crispy battered fish served with golden fries, tartar sauce, and a wedge of lemon.',
        category:'Main',
    image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a7af2a1adcab84a96138de9e47b5b237'},
        price:'R230.00'
    },

    {id:'8',
    name:' Chocolate Lava Cake',
    Description:'A rich, warm chocolate cake with a gooey molten center, served with vanilla ice-cream and a drizzle of chocolate sauce.',
    category:'Dessert',
    image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/7b690a4a284f74949cbc5647faf3a867'},
    price:'R75'
    },

    {id:'9',
    name:'Strawberry Cheesecake',
    Description:'A creamy baked cheesecake topped with fresh strawberries and a sweet berry glaze on a buttery bisuit crust. ',
    category:'Dessert',
    image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/e054afe08bc3c468889125c9a8bb2722'},
    price:'R65'},
]

export default function HomepageScreen({navigation,route }) {

  const filters = route.params?.filters || {};
  const {price,category} = filters;

  const priceToNumber = (priceString) =>{
    if(!priceString) return 0 ;

  const numericString = (priceString.replace('R','').replace(',',''));
  return  parseFloat(numericString)
  };

const [ filteredData, setFilteredData] = useState(MainmenuData);


useEffect (() => {

 let data = [...MainmenuData];

  if(category) {
    data = data.filter(item => item.category === category); 
  }
  if(price === 'Cheap to Expensive'){
    data  = data.sort((a,b) => priceToNumber(a.price)-priceToNumber(b.price));
  } else if (price === 'Expensive to Cheap') {
    data = data.sort((a,b) => priceToNumber(b.price)- priceToNumber(a.price));
  } // when this is clicked the user will be able to see the meals that are filtered cheapest to most expensive or most expensive to cheapest
  setFilteredData([...data]);
}, [category,price]);
  
const [expandedCardId, setExpandedCardId]=useState(null);

        const calculateAveragePrice = () => {
      const totalPrice = MainmenuData.reduce((sum, item) => {
        const priceValue= parseFloat(item.price.replace('R','').replace(',',''));
        return sum + priceValue;
      }, 0); 

      return totalPrice/MainmenuData.length;
    } ;
    
    const averagePrice = calculateAveragePrice();

    const renderItem = ({ item }) => {
    const isExpanded = expandedCardId === item.id;


    return(
    <TouchableOpacity
    onPress={() => setExpandedCardId(isExpanded ? null : item.id)}>
        <View style={[styles.card, isExpanded && styles.expandedCard]}>
        <Image source={item.image} style={[styles.image,isExpanded && styles.expandedImage]} resizeMode="cover"/>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.Description}</Text>
                { isExpanded && (
                  <>
                <Text style={styles.others}>{item.Others}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.category}>category:{item.category}</Text>
                </>
                )}
            </View>
        </View>
        </TouchableOpacity>
    );
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Christoffel's top dishes</Text>
            <Text style={styles.mealCount}>Total meals on menu:{MainmenuData.length}</Text>
            <Text style={styles.averagePrice}> Average Price:R{averagePrice.toFixed(2)}</Text>

              <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
        />  

    <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.navText}> Next</Text>
      </TouchableOpacity>

            <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.navText}> Back </Text>
        </TouchableOpacity>
        
        </ScrollView>

    );
    }


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    padding:20,
  },

  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
  },

listContent:{
  paddingBottom:120
},

Button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
  },


image:{
  width:100,
  height:100,
  borderRadius:8,
},

  description:{
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    },

  price:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

    title: {   
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    
    subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    },

});