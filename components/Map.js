import React from 'react';
import {Component} from "react";
import {Alert, Button, Platform, Text, Image} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import {Callout} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';
import {View} from "react-native";


export default class Map extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        map: null,
        location: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 1,
            longitudeDelta: 1,
        },
        markers: [{
            latlng: {
                latitude: 59.30,
                longitude: 18.07,
            },
            title: "Repere",
            description: "description de l'habitation"
        }, {
            latlng: {
                latitude: 59.30,
                longitude: 18.03,
            },
            title: "Repere 2",
            description: "description de l'habitation"
        }],
        errorMessage: null,
    };

    focusOff={
        x: 0,
        y: 300,
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.state.map.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }, 0)
    };



    render() {
        return (
            <MapView
                ref={(map) => {
                    this.state.map = map
                }}
                showsUserLocation={true}
                style={{flex: 1}}
            >
                {this.state.markers.map(marker => (
                    <Marker
                        calloutAnchor={{x:0.5,y:2}}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Callout style={{height: 400, width: 400 , backgroundColor:'#58A4B0'}} tooltip={true} onPress={() => {
                            Alert.alert("OUI")
                        }}>
                            <Text style={{alignSelf: 'center', fontSize:17, color:'white'}}>Jolie petite Chambre près du Canal St Martin</Text>
                            <Text> </Text>
                            <Text style={{alignSelf: 'center',color:'white'}}>
                                <Icon name="location" color="#4F8EF7"/> 0.9 Km
                            </Text>
                            <View style={{flex: 1, }}>
                                <Text style={{flex: 1, marginTop: -60,}}>
                                    <Image
                                        style={{
                                            width: 400,
                                            height: 200,
                                            resizeMode: 'contain'
                                        }}
                                        source={{uri: 'https://www.stockholmpass.com/images_lib/912099625_royalpalace2019_1.jpg'}}/>
                                </Text>
                            </View>
                            <Text style={{color:'white'}}>
                                Chambre dans boutique-hôtel: 2 voyageurs, 1 chambre , 1 lit , 1 salle de bain
                            </Text>
                            <Text> </Text>
                            <Text style={{color:'white'}}>Rémunération : 40€</Text>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        )
    }
}