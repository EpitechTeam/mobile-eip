import React from 'react';
import {Component} from "react";
import {Alert, Button, Platform, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import {Callout} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';
import {View} from "react-native";
import {Card, Layout} from "@ui-kitten/components";
import {ClockIcon} from "../screens/dash/extra/icons";
import {ImageOverlay} from "../screens/dash/extra/image-overlay.component";


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

    focusOff = {
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
                        calloutAnchor={{x: 0.5, y: 2}}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Callout style={{}} tooltip={true}
                                 onPress={() => {
                                     Alert.alert("OUI")
                                 }}>
                            <Card
                                style={styles.item}
                                header={() => {
                                    return (
                                        <View style={styles.itemHeaderDetails}>
                                            <Text
                                                category='h4'
                                                status='control'>
                                                {`Test visuel`}{"\n"}{`Mission d'une durée de 10 j`}
                                            </Text>
                                            <Text style={{marginTop: -70,}}>
                                                <Image
                                                    style={styles.itemHeader}
                                                    source={{uri: "https://edito.seloger.com/sites/default/files/styles/manual_crop_1440x480/public/page_garde_guide/image/location-appartement-guide-seloger.jpg"}}/>
                                            </Text>
                                        </View>)
                                }}
                                footer={() => {
                                    return (
                                        <View style={styles.itemFooter}>
                                            <View style={styles.itemReactionsContainer}>
                                                <Text
                                                    style={{}}>
                                                    Rémunération
                                                </Text>
                                            </View>
                                            <Text
                                                style={{}}>
                                                {`200 €`}
                                            </Text>
                                        </View>
                                    )
                                }}>
                                <Layout
                                    style={styles.itemStyxContainer}
                                    level='2'>
                                    <Text
                                        style={styles.itemStyxText}
                                        category='h6'>
                                        {`Nimes`}
                                    </Text>

                                </Layout>
                            </Card>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    list: {
        flex: 1,
    },
    detailsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginVertical: 8,
    },
    detailItem: {
        marginTop: 5,
        marginHorizontal: 4,
        borderRadius: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    item: {
        marginVertical: 8,
    },
    itemHeader: {
        width: 200,
        height: 200,
    },
    itemHeaderDetails: {
        alignItems: 'center',
    },
    itemStyxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        marginHorizontal: -8,
    },
    itemStyxText: {
        marginHorizontal: 16,
        marginVertical: 14,
    },
    itemStyxButton: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 24,
    },
    itemDescription: {
        marginHorizontal: -8,
        marginTop: 16,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemReactionsContainer: {
        flexDirection: 'row',
    },
    itemAddButton: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 0,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});
