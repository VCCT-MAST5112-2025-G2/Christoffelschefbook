import React from "react";
import { View, Text, Button, StyleSheet,Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons} from 'react-native-vector-icons';

export default function FilterScreen({navigation}) {
    const[sortOption, setSortOption] = useState('Featured Items');
    const[priceExpanded, setPriceExpanded] = useState(false);
    const[nutritionExpanded, setNutritionExpanded] = useState(false);
    const[dietaryExpanded, setDietaryExpanded] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Filter & Sort</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="menu-outline" size={24} color="black" style={styles.icon} />
                    <Ionicons name="search-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Sort By</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{sortOption}</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Filter By</Text>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.accordionHeader} onPress={() => setPriceExpanded(!priceExpanded)}>
                    <Text style={styles.accordionTitle}>Price</Text>
                    <Text style={styles.accordionIcon}>{priceExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {priceExpanded && (
                    <View style={styles.accordionContent}>
                        <Text>Price will go here</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.accordionHeader} onPress={() => setNutritionExpanded(!nutritionExpanded)}>
                    <Text style={styles.accordionTitle}>Nutrition</Text>
                    <Text style={styles.accordionIcon}>{nutritionExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {nutritionExpanded && (
                    <View style={styles.accordionContent}>
                        <Text>Nutrition will go here</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.accordionHeader} onPress={() => setDietaryExpanded(!dietaryExpanded)}>
                    <Text style={styles.accordionTitle}>Dietary</Text>
                    <Text style={styles.accordionIcon}>{dietaryExpanded ? '-' : '+'}</Text> 
                </TouchableOpacity>
                {dietaryExpanded && (
                    <View style={styles.accordionContent}>
                        <Text>Dietary will go here</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',   
        paddingTop: 40,
        paddingHorizontal: 20,
    },
});