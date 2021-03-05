import React, {Component, useCallback, useEffect, useState} from 'react';
import { ScrollView, Text, View,TouchableHighlight, TouchableOpacity, RefreshControl} from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Card,Icon,Rating,Button} from "react-native-elements";
import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';
import {getAvailableDishes, getChefs} from '../util/Queries';
import ChefRecList from '../components/chefRecList';
import Dish from '../objects/Dish';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Chef from "../objects/Chef";
import ChefRec from "../components/chefRec"
import { set } from 'react-native-reanimated';



function MapScreen(props){
    const [refreshing, setRefreshing] = useState(false);
    const [chefs, setChefs] = useState([]);
    var chefArr = [];
        for(i=0; i<chefs.length; i++){
            let chef = new Chef(chefs[i]);
            chefArr.push(chef);
        }
    const navigation = props.navigation;
    const [userLocation, setLocation] = useState(null);
    const [centerLocation, setCenterLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentChef,changeCurrentChef] = useState(null);
    


    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition((pos) => {
            var loc = {};
            setLocation(pos);
            if (centerLocation != null)
            {
                loc['latitude'] = centerLocation.latitude 
                loc['longitude'] = centerLocation.longitude 
                loc['latitudeDelta'] = .5;
                loc['longitudeDelta'] = .25;
                setRegion(loc);
            }
            else
            {
                var loc = {};
                loc['latitude'] = pos.coords.latitude 
                loc['longitude'] = pos.coords.longitude 
                loc['latitudeDelta'] = .5;
                loc['longitudeDelta'] = .25;
                setRegion(loc);
            }
            
        }, (err) => {
            let temp = {latitude:39.8283,longitude:-98.5795}
            setLocation(temp)
            var loc = {};
            if (centerLocation != null)
            {
                loc['latitude'] = centerLocation.latitude 
                loc['longitude'] = centerLocation.longitude 
                loc['latitudeDelta'] = .5;
                loc['longitudeDelta'] = .25;
                setRegion(loc);
            }
            else
            {
                var loc = {};
                loc['latitude'] = temp.latitude 
                loc['longitude'] = temp.longitude 
                loc['latitudeDelta'] = 84;
                loc['longitudeDelta'] = 42;
                setRegion(loc);
            }

        }, {
            enableHighAccuracy: true, timeout: 5000, maximumAge: 0
        });

        getChefs().then(function(results) {
            setChefs(results);
        }, ()=>{console.log("Error in useEffect getChefs")})
        .catch((err) => {console.log("Use Effect Err Chefs: ", err)});
    }, [])

    
    function centerRefresh(location,chef)
    {
        setCenterLocation(location)
        var loc={}
        loc['latitude'] = location.latitude 
        loc['longitude'] = location.longitude 
        loc['latitudeDelta'] = .5;
        loc['longitudeDelta'] = .25;
        setRegion(loc)
        changeCurrentChef(chef)
    }
    function reset()
    {
        if (userLocation != null && userLocation.coords!=null)
        {
            let temp = {latitude:userLocation.coords.latitude,longitude:userLocation.coords.longitude}
            setCenterLocation(userLocation)
            var loc={}
            loc['latitude'] = userLocation.coords.latitude 
            loc['longitude'] = userLocation.coords.longitude 
            loc['latitudeDelta'] = .5;
            loc['longitudeDelta'] = .25;
            setRegion(loc)
            setVisible(false)
        }
        else
        {
            setCenterLocation(userLocation)
            var loc={}
            loc['latitude'] = userLocation.latitude 
            loc['longitude'] = userLocation.longitude 
            loc['latitudeDelta'] = 84;
            loc['longitudeDelta'] = 42;
            setRegion(loc)
            setVisible(false)

        }
    }
    
    

    return(
        <View style={styles.container}>
            <NavBarComponent navigation={props.navigation}/>
            <View style={styles.contentView}>
                <MapView style={styles.map}
                    region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsTraffic={true}
                    pitchEnabled={false}
                    onPress={()=>setVisible(false)}
                    onMarkerPress={()=>setVisible(true)}
                    >
                    {
                    chefArr.map(chef => (
                    <MapView.Marker  coordinate={JSON.parse(chef.location)} onPress={()=>centerRefresh(JSON.parse(chef.location),chef)}>
                    </MapView.Marker>
                    ))
                    }
                {visible ? (
                    
                     <View style={{backgroundColor:"white",position:'absolute',bottom: '3%',width:"90%",height:"30%", justifyContent:"center", alignSelf:"center"}}>
                         <TouchableOpacity style={{width:"100%",height:"100%"}}onPress={() => navigation.navigate("Chef",{Chef:currentChef})}>
                         <Card containerStyle={styles.cardContainer}>
                         
                         <Card.Title><Text style={styles.title}>{currentChef.name}</Text></Card.Title>
                         <Card.Divider />
                         <View style={styles.cardlayout}>
                            <View style={styles.horizontal}>
                                <Card.Image source={{uri: currentChef.profilePicURL}} style={styles.image} />
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.desc}>{currentChef.shortDesc}</Text>
                            <View style={styles.ratingsContainer}>
                            <Rating
                                style={styles.rating}
                                readonly={true}
                                imageSize={13}
                                fractions={1}
                                startingValue={currentChef.rating ? currentChef.rating : 0.0}
                            />
                            <Text style={styles.numReviews}>({currentChef.numReviews})</Text>
                            </View>
                            </View>
                        </View>
                        </Card>
                         </TouchableOpacity>
                     </View>
                     

                ): <View/>}
                {/* <View style={{position:"absolute",top:5,left:5,height:20,width:70}} backgroundColor="light-blue">
                    <TouchableOpacity  backgroundColor="blue" onPress={() => reset()}>
                        <Text>Re-center</Text>
                    </TouchableOpacity>
                </View> */}
                <Button title="Re-center"  titleStyle={{fontFamily:'Avenir'}} buttonStyle={{backgroundColor:colors.secondary}} onPress={()=>reset()}/>
                    

                </MapView>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    cardlayout: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row"
      },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        fontSize: 16
    },
    contentView:{
        backgroundColor: 'white',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '100%'
    },
    cardContainer: {
        alignItems: "center",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        position:'absolute',
        bottom: '0%'
      },
    map: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        margin: '5%'
    },
    customView: {
        backgroundColor: 'white',
    },
    desc: {
        fontSize: 12,
        textAlign: "center"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
      
    horizontal: {
        width: "50%",
        marginTop: -10,
        justifyContent: "space-around",
        padding:3
    },
      
    icon: {
        width: 25,
        height: 25,
        borderRadius: 12.5
    },
    ratingsContainer: {
        width: '100%',
        flexDirection: "row",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    numReviews: {
        marginLeft: 5,
        fontSize: 12,
        color: 'grey',
        left: 45
    },
    rating: {
        position: 'absolute'
    },
    image: {
        height: "90%"
    }
});

export default MapScreen;
