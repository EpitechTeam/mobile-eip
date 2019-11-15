import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    View,
    FlatList,
    Button,
} from 'react-native';
import {Card, Icon} from "react-native-elements";

export default class DashboardScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{backgroundColor: '#58A4B0',}}>
                    <Text style={{fontSize: 25, alignSelf: 'center', color: 'white'}}>Contrat Disponible</Text>
                    <View style={{height:15}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Map')}}>
                            <Text style={{fontSize: 17, alignSelf: 'center', color: 'white'}}>>Ouvrir la carte</Text>
                    </TouchableOpacity>
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
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                        }}>
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
