import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView, TextInput} from "react-native";

const MainmenuData = [
    { id:'1',
        name:'Beef Welligton',
        Description:'A filet steak coated with mushroom duxelles and Parm ham, wrapped in puff pastry, and baked to perfection.',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/2d5df432941d8445a5a1d8f907281213'},
        price:'R450.00'
    },

    { id:'2',
        name:'Lobster with Red Pepper Sauce',
        Description:'A luxurious combination of sweet lobster paired with cardamom infused jus and a vibrant red pepper sauce.',
      image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a76d7c64e51bdd000ff21db9696c643e'},
        price:'R350.00'
    },

    { id:'3',
        name:'Elegant lobster bisque with foie gras',
        Description:'A lobster, cream and aromatic vegetables along with a decadent addition of foie gras.',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4011cbbd84f6c995147d45c285b451c8'},
        price:'R300.00'
    },

    { id:'4',
        name:'Kaiseki Wagyu Sukiyaki',
        Description:'Thinly sliced Wagyu beef cooked in a savory-sweet broth with vegetables, tofu, and noodles, served in a traditional Japanese style.',
        image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/bc828779cdb78dc9e7061b012b9ab9cb'},
        price:'R250.00'
    },

    { id:'5',
        name:'Wagyu Steak',
        Description:'A premium cut of Wagyu beef, served with roasted vegetables.',
        Others:'charred asparagus, light salad with citrus vinaigrette, roasted potatoes ',
       image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/b2886313ed81cb039207487e9ebe7896'},
        price:'R350.00'
    },

    { id:'6',
        name:'Herb-Crusted Rack of Lamb',
        Description:'A succulent rack of lamb coated with a fragrant herb crust, served with a red wine reduction and seasonal vegetables.',
     image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/aaa66b5560d6bd24a17decac87151123'},
        price:'R300.00'
    },

    { id:'7',
        name:'Classic Fish and Chips',
        Description:'Crispy battered fish served with golden fries, tartar sauce, and a wedge of lemon.',
    image:{uri:'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a7af2a1adcab84a96138de9e47b5b237'},
        price:'R230.00'
    },
]

export default function HomepageScreen({navigation}) {
const [mainMenu, setMainmenu] = useState(MainmenuData);
const [showForm, setShowForm] = useState(false);
const router = useRouter();

const [newMeal, setNewMeal] = useState({
  name:"",
  Description:"",
  price:"",
  image:"",
});

const handleAddMeal = () =>{
  if (!newMeal.name || !newMeal.price){
    alert("Please fill in name and price");
    return;
  
  }
  const newItem = {
    id:(mainMenu.length + 1).toString(),
    name: newMeal.name,
    Description:newMeal.Description,
    price:newMeal.price,
    image:newMeal.image?{uri:newMeal.image} :null,
  };
  setMainmenu([...mainMenu,newItem]);
  setNewMeal({name:"",Description:"",price:"",image:"",});
  setShowForm(false);
};

    const renderItem = ({ item }) => (
        <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="cover"/>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.Description}</Text>
                <Text style={styles.others}>{item.Others}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );
    return (
      <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Christoffel's top dishes</Text>
              <FlatList
            data={mainMenu}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
        />  
           <TouchableOpacity style = {styles.Button} onPress = {()=>setShowForm(true)}>
           <Text style={styles.navText}>Add</Text>
           </TouchableOpacity>

            <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.navText}> Back </Text>
      </TouchableOpacity>

{showForm && (
           <View style={styles.formContainer}>
        
           <TextInput 
           style={styles.input}
           placeholder="Meal name"
           value={newMeal.name}
           onChangeText={(text)=> setNewMeal({...newMeal,name:text})}/>

           <TextInput style={styles.input}
           placeholder="Description"
           value={newMeal.description}
           onchangeText={(text)=>setNewMeal({...newMeal, description:text})}/>

            <TextInput style={styles.input}
           placeholder="Price"
           value={newMeal.price}
           onchangeText={(text)=>setNewMeal({...newMeal, price:text})}/>

            <TextInput style={styles.input}
           placeholder="Image"
           value={newMeal.image}
           onchangeText={(text)=>setNewMeal({...newMeal, image :text})}/>
           
           <View style={styles.formButtons}>
           <TouchableOpacity style={styles.saveButton} onPress={handleAddMeal}>
           <Text style = {styles.navText}>Save</Text>
           </TouchableOpacity>

           <TouchableOpacity style= {styles.cancelButton} onPress={()=> setShowForm(false)}>
           <Text style={styles.navText}>Cancel</Text>
           </TouchableOpacity>
    
   </View>
        </View>
)}
        </ScrollView>
    )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  cancelButton:{
 backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
  },

  saveButton:{
 backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
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

  Price:{
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