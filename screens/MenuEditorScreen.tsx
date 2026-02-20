import React, { useState } from "react";
import { View, Text,TextInput,Button,TouchableOpacity,FlatList, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, ScrollView } from "react-native";

//setting up interface(Murphy, 2023)
interface MenuItem {
    dishName: string;
    description: string;
    course: string;
    price:number;
}

interface MenuEditProps {
    menu: MenuItem[];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
                                                            //Using "React.Dispatch<React.SetStateAction<MenuItem[]>>" to add a menu array that can be updated from is precious state (Mokos, 2020).
    navigation: StackNavigationProp <any , any>;
}
//(Elham Najeebullah, 2023)
const MenuEditScreen: React.FC<MenuEditProps> = ({menu, setMenu, navigation}: any) => {
    const [dishName, setDishName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [course, setCourse] = useState<string>('')
    const [price, setPrice] = useState<number | ''>('');

    //Adding a function to add menu items

    const addMenuItem = () => {
        if(dishName && description && course && price){
            const newItem: MenuItem = {dishName, description, course, price: Number(price),};
                                                                                            //If all data is present, the the new menu item is added along with all the other menu items.
            setMenu([...menu, newItem]);
                                                                                            //setMenu updates the state of the array with anew array, re-rendering the previous list of items with updated information.
            setDishName("");
            setDescription("");
            setCourse("");
            setPrice("");
        }
        
    };

    const calculateAverages = (courseType: string) => {
        //courseType represents the different categories(Mains, starters & desserts)
        const filteredItems = menu.filter((item: { course: string; }) => item.course === courseType);
                                                                                                        //menu is an array holding the menu items, price, name, course.
                                                                                                        //filter is a method used to filter the menu array for any items with its course matching the courseType parameter (Rico, 2023).
        const totalPrice = filteredItems.reduce((sum: any, item: { price: any; }) => sum + item.price, 0);
                                                                                                        //.reduce is a method used to look at all the objects in the array and calculate the total price by checking all of the prices (GeeksforGeeks, 2020).
                                                                                                        // sum is the accumulator, it starts at zero and is added to the item price.
        return filteredItems.length> 0? (totalPrice / filteredItems.length).toFixed(2) :"0.00";
                                                                                                        //The returns the value of the courses average prices if there are any to the courseType parameter, if not then it returns "0.00"
    };

    const backToHome = () => {
        //returning values from the calculateAverages function and assignin them to the variables below (The IIE, 2024).
        const averageStarters = calculateAverages("Starters");
        const averageMains = calculateAverages("Mains");
        const averageDesserts = calculateAverages("Desserts")

        navigation.navigate("Home", {
            //Passing these variables to the hoempage to be displayed via the route parameter.
            averageStarters,
            averageMains,
            averageDesserts,
        })
    }

    const deleteMenuItem = (index: number) => {
        const updatedMenu = menu.filter((meal: any,menuIndex: number) => menuIndex !== index); //Method used to remove selectd array items from the array itself (The IIE, 2024).

        setMenu(updatedMenu) //updating the state variable so that the menu array is re-rendered to house the current list of items after one has been removed.(The IIE, 2024)
    }

    return(
        <View style = {styles.container}>
            <View style= {styles.header}>
                <Image style= {styles.imgStyle}
                source={require('../img/mastlogo.png')}/>
                
            </View>
            
            <FlatList
                style = {styles.flatlist}
                data={menu}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>Menu</Text>
                        <Text style={styles.subtitle}>Total Menu Items: {menu.length} </Text>

                        <Text style= {styles.formTitle}>Add Menu Items</Text>

                        <TextInput
                        placeholder="Dish Name"
                        value={dishName}
                        onChangeText={setDishName}
                        style = {styles.input}/>

                        <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style = {styles.input}/>

                        <Picker selectedValue={course} onValueChange={(itemValue) => setCourse(itemValue)} style = {styles.picker}> 
                            <Picker.Item label="Starters" value="Starters"/>
                            <Picker.Item label="Mains" value="Mains"/>
                            <Picker.Item label="Desserts" value="Desserts"/>
                            {/*(Reactnative.dev, 2022)*/}
                        </Picker>

                        <TextInput
                        placeholder="Price"
                        value={price.toString()}
                        onChangeText={(text) => setPrice (Number(text))}
                        keyboardType="numeric"
                        style = {styles.input}
                        />

                        <Text style = {styles.subtitle}>Current Menu</Text>
                    </>
                    
                }
                renderItem={({item, index}) => (
                    <View style = {styles.menuItem}>
                        <View>
                            <Text style = {styles.menuText}>{item.dishName} - {item.course} - R{item.price}</Text>

                            <Text style = {styles.menuText}>{item.description}</Text>
                        </View>

                        <TouchableOpacity style= {styles.deleteButton} onPress ={() => deleteMenuItem(index)}>
                            <Text style = {styles.deleteButtonText}> Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />    
            <View>
                <Button title="Add Item" onPress = {addMenuItem}/>
                <TouchableOpacity style = {styles.button} onPress = {backToHome}>
                <Image style= {styles.iconStyle}
                source={require('../img/home.png')}/>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000", /*Black */
    },
    iconStyle:{
        height:40,
        width:40,
        marginHorizontal:"45%"
    },
    button:{
        backgroundColor:"#FFD700",
        paddingVertical:15,
        paddingHorizontal:25,
        borderRadius:10,
        marginVertical:10,
        shadowColor:"#fff",
        shadowOffset: {width:0, height: 2},
        shadowOpacity:0.5,
        shadowRadius:4,
    },

    buttonText: {
        fontSize:18,
        fontWeight:"600",
        color:"#000",
    },

    header:{
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#000", /*white */
        padding: 15,
    },

    imgStyle:{
        width: 180,
        height:180,
        borderRadius:90,
    },

    content:{
        paddingHorizontal:20,
        marginBottom:15,
    },

    title:{
        fontSize: 28,
        fontWeight: "bold",
        color:"#d4af37", /*Gold */
        marginBottom: 20,
    },

    subtitle:{
        fontSize: 18,
        color:"#fff",
        marginBottom: 20,
    },

    formSection:{
        paddingHorizontal:20,
    },

    menuItem:{
        backgroundColor:"#1c1c1c", /*Grey */
        padding: 15,
        borderRadius:10,
        marginBottom:15,
        shadowColor:"#000",
        shadowOffset:{width:0, height:2},
        shadowOpacity: 0.3,
        shadowRadius:2,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    menuText: {
        fontSize:16,
        fontWeight:"bold",
        color:"#d4af37",
    },

    descriptionText:{
        fontSize:14,
        color: "#fff",
        marginTop: 5,
        fontWeight:"bold",
    },

    formTitle:{
        fontSize:24,
        fontWeight:"bold",
        color:"#d4af37",
        marginTop:30,
        marginBottom: 10,
    },

    input:{
        backgroundColor:"#D3D3D3", /*Light Grey */
        padding:10,
        borderWidth:1,
        borderColor:"#d4af37",
        borderRadius: 8,
        marginBottom: 15,
        color:"#000",
    
    },

    picker:{
        backgroundColor:"#1c1c1c",
        borderWidth: 1,
        borderColor:"#d4af37",
        borderRadius: 8,
        marginBottom: 15,
        color:"#fff",
    },

    buttonContainer:{
        borderRadius: 8,
    },

    flatlist:{
        flexGrow: 1,
    },
    
    deleteButtonText: {
        color: 'black',
        fontWeight:'bold',
        padding:5,
        marginTop:'25%'
    },
    deleteButton:{
      backgroundColor:'gold',
      borderRadius:8,
      height:60,
      width:60
    },
})
export default MenuEditScreen;

/*
Reference List

The IIE. 2024. Mobile App Scripting[MAST5112 Module Manual].
The Independent Institute of Education: Unpublished.
  
Elham Najeebullah .2023. React & TypeScript: What is React.FC and Why should i use it? [online] DEV Community. Available at: https://dev.to/elhamnajeebullah/react-typescript-what-is-reactfc-and-why-should-i-use-it-4029 [Accessed 21 Nov. 2024].

GeeksforGeeks .2020. TypeScript Array reduce() Method. [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/typescript-array-reduce-method/ [Accessed 21 Nov. 2024].

Mokos, M.2020. Typing of React hooks in Typescript - ableneo Technology - Medium. [online] Medium. Available at: https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0 [Accessed 21 Nov. 2024].

Murphy, C.2023. TypeScript Interfaces: A Practical Guide with Code Examples. [online] prismic.io. Available at: https://prismic.io/blog/typescript-interfaces [Accessed 7 Oct. 2024].

Reactnative.dev.2022. Picker · React Native Archive. [online] Available at: https://archive.reactnative.dev/docs/picker [Accessed 7 Oct. 2024].

Rico, V.V.2023. 6 different ways to use the .filter () method of arrays in Javascript/Typescript. [online] Medium. Available at: https://medium.com/@victor.valencia.rico/6-different-ways-to-use-the-filter-method-of-arrays-in-javascript-typescript-19723ed879d8 [Accessed 21 Nov. 2024].
*/