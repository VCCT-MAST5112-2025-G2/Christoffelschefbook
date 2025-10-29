import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView, TextInput} from "react-native";

export default function HomepageScreen({navigation}) {
const [showForm, setShowForm] = useState(false); // Component state mananging the add meal form 
const router = useRouter();

const [newMeal, setNewMeal] = useState({
  name:"",
  Description:"",
  price:"",
  category:"",
  image:"",
}); // Component state for managing the new meal inputs

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
    category:newMeal.category,
  }; // New meal object created from the form inputs

  setMainmenu([...mainMenu,newItem]);
  alert("Meal added! Total meals:" + (mainMenu.length + 1));
  setNewMeal({name:"",Description:"",price:"",image:"",});
  setShowForm(false);
}; // Function to handle adding a new meal to the main menu

  
  

    return (
      <ScrollView>
           <TouchableOpacity style = {styles.Button} onPress = {()=>setShowForm(true)}>
           <Text style={styles.navText}>Add</Text>
           </TouchableOpacity>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.navText}> Remove </Text>
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

           <Text styles={{marginTop:10, fontWeight:'bold'}}>Select Meal Category:</Text>
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
        </ScrollView>
    )
};

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

});

    
