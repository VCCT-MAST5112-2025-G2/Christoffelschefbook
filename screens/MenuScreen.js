import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView, TextInput,Alert} from "react-native";
import Checkbox from 'expo-checkbox';
import {useRoute} from '@react-navigation/native';



export default function MenuScreen ({navigation}) {

  const route = useRoute();
  const {filters} = route.params || {};
  const [mainMenu, setMainmenu] = useState ([]);
const [showForm, setShowForm] = useState(false); // Component state mananging the add meal form 
const router = useRouter();
const [showRemoveList, setShowRemoveList] = useState(false);
const [selectedMeals, setSelectedMeals] = useState([]);

const [newMeal, setNewMeal] = useState({
  name:"",
  Description:"",
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
    Description:newMeal.Description,
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

            <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Filter')}>
        <Text style={styles.navText}> Filter </Text>
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
           value={newMeal.Description}
           onChangeText={(text)=>setNewMeal({...newMeal, Description:text})}/>

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
        onPress={() => navigation.navigate('Home')}>
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


    
