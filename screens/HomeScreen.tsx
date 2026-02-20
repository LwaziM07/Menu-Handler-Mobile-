import React, {useState} from "react";
import { View,Button,TextInput,FlatList,Text,Image,TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker"; /* Picker- renders the native picker component on iOS or Android, Helps when setting setting a predefined list of items that are supposed to be selected (Reactnative.dev, 2022).*/
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/*interfaces are a feature in TypeScript that help define the structure of an object and specify its properties,
i.e variables and thier data types(Murphy, 2023)*/

interface MenuItem{
    dishName: string;
    dishDescription: string;
    course:string;
    price: number;
}

interface HomeScreenProps{

    menu: MenuItem[];
    navigation: StackNavigationProp <any,any>;
}

//(Elham Najeebullah, 2023)
const HomeScreen: React.FC<HomeScreenProps> = ({route,menu, navigation}:any) => {

    const {averageStarters, averageMains, averageDesserts} = route.params || {
        averageStarters:"0:00",
        averageMains: "0.00",
        averageDesserts: "0.00"
    }

    return(
        
        <View style ={styles.container}>

            <View style= {styles.header}>
                <Image style= {styles.imgStyle}
                source={require('../img/mastlogo.png')}/>
                
            </View>
            

            <View style= {styles.content}>

                <Text style={styles.title}>Menu</Text>
                <Text style={styles.subtitle}>Total Menu Items: {menu.length} </Text>

                <Text style={styles.subtitle}>Average Prices </Text>
                <View style = {styles.averagesDisplay}>
                    <Text style={styles.averageText}>Starters: R{averageStarters} </Text>
                    <Text style={styles.averageText}>Mains: R{averageMains} </Text>
                    <Text style={styles.averageText}>Desserts: R{averageDesserts} </Text>
                </View>

            </View>
            
            
            <FlatList
                data={menu}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={({item}) => (
                    <View style= {styles.menuItem}>
                        <Text style={styles.menuText}>
                            {item.dishName} - {item.course} - R {item.price}
                        </Text>

                        <Text style = {styles.descriptionText}> {item.description} </Text>
                    </View>
                )}
            />
            <View style={styles.buttonContainers}>
                <TouchableOpacity style = {styles.button}
                onPress={() => navigation.navigate("MenuEditorScreen")}>
                    <Image style= {styles.iconStyle}
                source={require('../img/food.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button}
                onPress={() => navigation.navigate("CourseFilter")}>
                    <Image style= {styles.iconStyle}
                source={require('../img/filter.png')}/>
                </TouchableOpacity>
            </View>
            
        </View>
        /*FlatLists (reactnative.dev, n.d.)*/
    );/*contentContainerStyle (Reactnative.dev, 2024) */
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000", /*Black */
    },

    iconStyle:{
        height:40,
        width:40,
        marginHorizontal:"30%"
    },
    
    button:{
        backgroundColor:"#FFD700",
        paddingVertical:15,
        paddingHorizontal:50,
        borderRadius:10,
        marginVertical:10,
        shadowColor:"#fff",
        shadowOffset: {width:0, height: 2},
        shadowOpacity:0.5,
        shadowRadius:4,
        width:"50%",
        height:'auto',
        marginHorizontal:1
    },
    averageText:{
        fontSize:16,
        color:"#fff"
    },
    averagesDisplay:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },

    buttonText: {
        fontSize:18,
        fontWeight:"600",
        color:"#000",
    },

    buttonContainers:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
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
        marginBottom:10,
    },

    title:{
        fontSize: 28,
        fontWeight: "bold",
        color:"#d4af37", /*Gold */
        marginBottom: 15,
    },

    subtitle:{
        fontSize: 18,
        color:"#fff",
        marginBottom: 15,
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
        fontSize:18,
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

export default HomeScreen;

/*Reference List

Murphy, C. (2023). TypeScript Interfaces: A Practical Guide with Code Examples. [online] prismic.io. Available at: https://prismic.io/blog/typescript-interfaces [Accessed 7 Oct. 2024].

Reactnative.dev. (2024). FlatList · React Native. [online] Available at: https://reactnative.dev/docs/flatlist#listheadercomponent [Accessed 7 Oct. 2024].

Reactnative.dev. (2024). ScrollView · React Native. [online] Available at: https://reactnative.dev/docs/scrollview#contentcontainerstyle [Accessed 7 Oct. 2024].

Reactnative.dev. (2022). Picker · React Native Archive. [online] Available at: https://archive.reactnative.dev/docs/picker [Accessed 7 Oct. 2024].

reactnative.dev. (n.d.). FlatList · React Native. [online] Available at: https://reactnative.dev/docs/flatlist [Accessed 7 Oct. 2024].

The IIE. 2024. Mobile App Scripting[MAST5112 Module Manual].
 The Independent Institute of Education: Unpublished.*/
