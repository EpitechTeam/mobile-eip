import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Card, Icon} from "react-native-elements";

export default class ExercicesScreen extends React.Component {

    static navigationOptions = {
        header: null
    };
    render() {
        return (

            <View style={{
                flex: 1,
            }}>
                <View style={{backgroundColor: '#58A4B0',}}>
                    <Text style={{fontSize: 25, alignSelf: 'center', color: 'white'}}>Contrat Accepter</Text>
                    <View style={{height:15}}/>
                </View>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                        {key: 'Dominic'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) => (  <TouchableOpacity onPress={()=>{}}>
                        <Card
                            title='Jolie petite Chambre près du Canal St Martin'
                            image={{uri: 'https://www.stockholmpass.com/images_lib/912099625_royalpalace2019_1.jpg'}}>
                            <Text style={{marginBottom: 10}}>
                                Chambre dans boutique-hôtel: 2 voyageurs, 1 chambre , 1 lit , 1 salle de bain
                            </Text>
                            <Text>Rémunération : 40€</Text>
                        </Card></TouchableOpacity>)}
                />
            </View>
        );
    }
}
