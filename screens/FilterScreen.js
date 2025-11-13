import React, {useState} from 'react'
import {useRouter} from 'expo-router';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import  {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


export default function FilterScreen({navigation}) {
    const[sortOption, setSortOption] = useState('Featured Items');
    const[priceExpanded, setPriceExpanded] = useState(false);
    const[categoryExpanded, setCategoryExpanded] = useState([]);
    const[state, setState] = useState({});

    const[selectedPrice,setSelectedPrice] = useState(null);
    const[selectedCategory, setSelectedCategory] = useState([]);


    const router = useRouter();

 

    const hanldeApplyFilter = () =>{
      const filters = {
        price:selectedPrice,
       category:selectedCategory,
      };
      navigation.navigate('Homepage',{filters});
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerIcons}>
                    <Ionicons name="menu-outline" size={24} color="white" style={styles.icon} />
                    <Ionicons name="search-outline" size={24} color="white" style={styles.icon} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Sort By</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{sortOption}</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.accordionHeader} onPress={() => setPriceExpanded(!priceExpanded)}>
                    <Text style={styles.accordionTitle}>Price</Text>
                    <Text style={styles.accordionIcon}>{priceExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>

                {priceExpanded && (
                    <View style={styles.accordionContent}>
                    {['Cheap to Expensive', 'Expensive to Cheap'].map((option) => (
                      <TouchableOpacity 
                      key={option}
                      style={[
                        styles.filterOption, selectedPrice === option && styles.selectedOption,]} 
                        onPress={() => setSelectedPrice(option)}>
                        <Text style={[styles.optionText,selectedPrice === option && styles.selectedText,]}>
                        {option}
              </Text>
              </TouchableOpacity>
                    ))}
                    </View>
                )}

                <TouchableOpacity style={styles.accordionHeader} onPress={() => setCategoryExpanded(!categoryExpanded)}>
                <Text style={styles.accordionTitle}>Category</Text>
                <Text style={styles.accordionIcon}>{categoryExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>

                {categoryExpanded && (
                  <View style={styles.accordionContent}>
                  {['Starters', 'Main', 'Desert'].map((option) =>( 
                    <TouchableOpacity
                    key={option}
                    style={[ styles.filterOption,selectedCategory === option && styles.selectedOption,]}
                    onPress={() => setSelectedCategory(option)}> 
                    <Text style={[styles.optionText,selectedCategory === option && styles.selectedText,]}>
                    {option}
                    </Text>
                    </TouchableOpacity>
                  ))}
                  </View>
                )}

     
      <TouchableOpacity
        style={styles.Button}
        onPress={hanldeApplyFilter}>
        <Text style={styles.navText}> Apply filter </Text>
      </TouchableOpacity>  // will allow the user to actually apply the 

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',   
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    
    Button: {
         backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
    },

    navText: {
      color:'black',
      fontSize:16,
    }, 

  dropdown: {
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor:'#fff',
  }, 

  dropdownText:{
color:'black', 
  },

  sectionTitle:{
    backgroundColor:'white',
    fontSize: 18,
    marginBottom:10,
  }, 

  accordionIcon:{
color:'white', 
fontSize:16,
  }, 

  accordionTitle:{
    color:'white',
    fontSize:16,
  }, 

  accordionContent:{
paddingVertical:10,
paddingHorizontal:5,
  },

headerIcons:{
flexDirection: 'row', 
},

filterOption:{

},


});