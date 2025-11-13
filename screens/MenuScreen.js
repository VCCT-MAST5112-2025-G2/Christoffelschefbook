import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView, TextInput,Alert} from "react-native";
import Checkbox from 'expo-checkbox';
import {useRoute} from '@react-navigation/native';



export default function MenuScreen ({navigation}) {

  const route = useRoute();
  const {filters} = route.params || {};
  const [mainMenu, setMainmenu] = useState ([
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
    
  ]);
const [showForm, setShowForm] = useState(false); // Component state mananging the add meal form 
const router = useRouter();
const [showRemoveList, setShowRemoveList] = useState(false);
const [selectedMeals, setSelectedMeals] = useState([]);

const [newMeal, setNewMeal] = useState({
  name:"",
  description:"",
  price:"",
  category:"",
  image:"",
}); // Component state for managing the new meal inputs

const handleAddMeal = () =>{
  if (!newMeal.name || !newMeal.price || !newMeal.description){
    Alert.alert("Missing info", "Please fill in name and price");
    return;

  }
  const newItem = {
    id:(mainMenu.length + 1).toString(),
    name: newMeal.name,
    description:newMeal.description,
    price:newMeal.price,
    image:newMeal.image?{uri:newMeal.image} :null,
    category:newMeal.category,
  }; // New meal object created from the form inputs

  const updatedMenu = [...mainMenu, newItem];
    setMainmenu(updatedMenu);

      console.log("Alert shoud show now!");

Alert.alert(
  "Meal Added!",
`Meal successfully added.\nTotal meals: ${updatedMenu.length}`,
[{text:"OK",
onPress: () => {
  setShowForm(false);
 setNewMeal({name:"",Description:"",price:"",category:"",image:""});
}
}
]
 ); 
 // Function to handle adding a new meal to the main menu
};


const toggleMealSelection = (id) => {
  if (selectedMeals.includes(id)){
    setSelectedMeals(selectedMeals.filter((mealId) => mealId !== id));
  } else{ setSelectedMeals([...selectedMeals,id]);
  }
};

const handleRemoveMeals = () => {
  if(selectedMeals.length===0){
    Alert.alert("No selection", "Please select at least one meal to remove.");
    return;
  }

  const updatedMenu=mainMenu.filter(
    (meal) => !selectedMeals.includes(meal.id)
  );

  setMainmenu(updatedMenu);
  setSelectedMeals([]);
  setShowRemoveList(false);

  Alert.alert("Meals removed", "Selected meals have been removed");
};

  const renderMeal = ({item}) => (
    <View style ={styles.card}>
    {item.image && <Image source={item.image} style={styles.image}/>}
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.price}>{item.price}</Text>
    <Text style={styles.category}>Category:{item.category}</Text>

  {showRemoveList && (
    <View style={
      styles.checkboxContainer}>
      <Checkbox value={
        selectedMeals.includes(item.id)
      } onValueChange={() => toggleMealSelection(item.id)}/>
      <Text style={styles.checkboxLabel}> Select to remove </Text>
      </View>
  )}
    </View>
  );

    return (
      <ScrollView>
           <TouchableOpacity style = {styles.Button} onPress = {()=>setShowForm(true)}>
           <Text style={styles.navText}>Add Meal </Text>
           </TouchableOpacity>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => setShowRemoveList(!showRemoveList)}>
        <Text style={styles.navText}>
        {showRemoveList ? "Cancel Remove":"Remove Meal"}
        </Text>
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
           onChangeText={(text)=>setNewMeal({...newMeal, description:text})}/>

            <TextInput style={styles.input}
           placeholder="Price (eg.R230)"
           value={newMeal.price}
           onChangeText={(text)=>setNewMeal({...newMeal, price:text})}/>

            <TextInput style={styles.input}
           placeholder="Image"
           value={newMeal.image}
           onChangeText={(text)=>setNewMeal({...newMeal, image :text})}/>

           <Text style={{marginTop:10, fontWeight:'bold'}}>Select Meal Category:</Text>
           <View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:10}}>

           {['Starter', 'Main', 'Dessert'].map(type=>(
             <TouchableOpacity key={type}
             style={{
               backgroundColor: newMeal.category === type? '#FfDDc1' : '#fff',
               padding: 10,
               borderRadius:5,
               borderColor:'#ccc',
               borderWidth:1
             }}
             onPress={() => setNewMeal({ ...newMeal,category:type})}>
             <Text>{type}</Text>
             </TouchableOpacity>
           ))}
           </View>

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
<FlatList
data={mainMenu}
renderItem={renderMeal}
keyExtractor={(item) => item.id}
contentContainerStyle={{paddingBottom:100}}/>

{showRemoveList && (
  <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveMeals}>
  <Text style={styles.navText}> Deleted Selected Meals</Text>
  </TouchableOpacity>
)} 
            <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Filter')}>
        <Text style={styles.navText}> Filter </Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}> Back </Text>
      </TouchableOpacity>
      </ScrollView>
    );// this will list all the meals the user will remove after selected what meals they want to remove 
// this button will take the user back to the homepage screen
 // this button will take the user to the filter page
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
  description:{
    fontSize: 14,
    color: 'black',
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

    category: {
      fontSize:14,
      color:'#333',
      margin:4,
    },

    deleteButton:{
 backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
    },

});
