import { useState } from "react";
import { View, Text, FlatList,Image,StyleSheet,TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native";

/*interfaces are a feature in TypeScript that help define the structure of an object and specify its properties,
i.e variables and thier data types(Murphy, 2023)*/
interface MenuItem {
    dishName: string;
    description:string;
    course: string;
    price: number;
}

interface CourseFilterProps{
    menu: MenuItem[];
}

//(Elham Najeebullah, 2023)
const CourseFilterScreen: React.FC<CourseFilterProps> = ({navigation, menu}:any) =>{
    const [selectedCourse, setSelectedCourse] = useState<String>("All"); //State variable that tracks which course type is selected

    const filteredMenu = selectedCourse === 'All'// setting a new array based on the state of the variable.

    ?menu //If the there are no courses selected, all menu items in the menu array will be displayed.

    :menu.filter((item: { course: String; }) => item.course === selectedCourse); //If there is a selceted course type, the program will show all the menu item of that course type(Rico, 2023).

    return(
        <View style = {styles.container}>

            <View style= {styles.header}>
                <Image style= {styles.imgStyle}
                source={require('../img/mastlogo.png')}/>
                
            </View>

            <Text style = {styles.subtitle}>Course Filter</Text>
                {/*(Reactnative.dev, 2022) */}
            <Picker selectedValue={selectedCourse} onValueChange={(itemValue) => setSelectedCourse(itemValue)} style={styles.picker}>
                <Picker.Item label="All" value="All"/>
                <Picker.Item label="Starters" value="Starters"/>
                <Picker.Item label="Mains" value="Mains"/>
                <Picker.Item label="Desserts" value="Desserts"/>
            </Picker>
                {/*(Reactnative.dev, 2024) */}
            <FlatList 
            data={filteredMenu}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item}) => (
                <View style = {styles.menuItem}>
                    <Text style ={styles.menuText}>{item.dishName} - {item.course} - ${item.price}</Text> 
                </View> 
                
            )}/>
            {/*Displaying array values (The IIE, 2024) */}

            <TouchableOpacity style = {styles.button} onPress = {() => navigation.goBack()}>
            <Image style= {styles.iconStyle}
                source={require('../img/home.png')}/>
            </TouchableOpacity>        
            
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

    listContent:{
        paddingTop:20,
    },

});

export default CourseFilterScreen;

/*Reference List 

Elham Najeebullah.2023. React & TypeScript: What is React.FC and Why should i use it? [online] DEV Community. Available at: https://dev.to/elhamnajeebullah/react-typescript-what-is-reactfc-and-why-should-i-use-it-4029 [Accessed 21 Nov. 2024].

Murphy, C.2023. TypeScript Interfaces: A Practical Guide with Code Examples. [online] prismic.io. Available at: https://prismic.io/blog/typescript-interfaces [Accessed 7 Oct. 2024].

Reactnative.dev.2022. Picker · React Native Archive. [online] Available at: https://archive.reactnative.dev/docs/picker [Accessed 7 Oct. 2024].

Reactnative.dev. 2024. FlatList · React Native. [online] Available at: https://reactnative.dev/docs/flatlist#listheadercomponent [Accessed 7 Oct. 2024].

Rico, V.V.2023. 6 different ways to use the .filter () method of arrays in Javascript/Typescript. [online] Medium. Available at: https://medium.com/@victor.valencia.rico/6-different-ways-to-use-the-filter-method-of-arrays-in-javascript-typescript-19723ed879d8 [Accessed 21 Nov. 2024].


The IIE. 2024. Mobile App Scripting[MAST5112 Module Manual].
 The Independent Institute of Education: Unpublished.
 */