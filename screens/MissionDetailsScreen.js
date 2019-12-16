import React from 'react';
import {View, Image, Button, TouchableOpacity, ScrollView} from "react-native";
import {Avatar, Card, Text} from "react-native-elements";

export default class MissionDetailsScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: '#ffffff',
            }}>
                <Image source={{uri: 'https://www.stockholmpass.com/images_lib/912099625_royalpalace2019_1.jpg'}}
                       style={{width: '100%', height: '30%'}}/>
                <ScrollView style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontSize:20
                    }}>date d’arrivée: 20/6/20</Text>
                    <Text/>
                    <Text style={{
                        fontSize:20
                    }}>date de départ: 25/6/20</Text>
                    <Text/>
                    <Text style={{
                        fontSize:20
                    }}>date de préparation de l’appartement: 19/6/20</Text>
                    <Text/>
                    <Text style={{
                        fontSize:20
                    }}>nombre de voyageurs: 2</Text>
                    <Text/>
                    <Text style={{
                        fontSize:20
                    }}>notes/services demandés par le propriétaire et le coût de ce service: </Text>
                    <Text style={{
                        fontSize:20
                    }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis mollis justo. Quisque tempor neque id mi pharetra, vel facilisis turpis iaculis. Nulla facilisi. Sed tincidunt posuere posuere. Duis lectus nisl, viverra ac tellus a, laoreet tempus tellus. Aliquam placerat sem sem, non consectetur nunc fringilla id. In viverra, est ut bibendum fringilla, est nulla posuere urna, id accumsan dolor est quis est. Mauris mauris eros, euismod at odio ac, cursus faucibus tellus. Ut eu iaculis nisl. Aenean nec lacus libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod dolor vitae neque bibendum gravida. Praesent in dignissim diam. Morbi malesuada non ex pellentesque finibus. Quisque pellentesque viverra tellus, in dapibus purus finibus eu. Integer ac massa vel est iaculis posuere sed in nunc.</Text>
                </ScrollView>
                <View style={{
                    flex: 0.1,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        backgroundColor:'blue'
                    }} onPress={()=>{this.props.navigation.goBack()}}>

                        <Text/>
                        <Text style={{textAlign:'center' , textAlignVertical:'center'}}>Accepter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        backgroundColor:'red'
                    }} onPress={()=>{this.props.navigation.goBack()}}>

                        <Text/>
                        <Text style={{textAlign:'center', textAlignVertical:'center'}}>Refuser</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}