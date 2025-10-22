import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text,StyleSheet,Image, FlatList, TouchableOpacity,ScrollView, TextInput} from "react-native";

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
] // Menu for the restaurant


export default function HomepageScreen({navigation}) {
const [mainMenu, setMainmenu] = useState(MainmenuData);
const [showForm, setShowForm] = useState(false); // Component state mananging the add meal form 
const router = useRouter();
const [expandedCardId, setExpandedCardId]=useState(null); // Component states for managing the accability of the meal cards


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
    }; // On press allowing the ability to expand and collapse meal cards to view more details

    return (
      <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Christoffel's top dishes</Text>
            <Text style={styles.mealCount}>Total meals on menu:{mainMenu.length}</Text>
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
}; // ScrollView containing the main menu list, add meal button, and back button to welcome screen


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

}); // Styles for the homepage screen components