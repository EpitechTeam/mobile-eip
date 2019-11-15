import React from "react";
import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {TextField} from "react-native-material-textfield";

export default class RegisterScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            password: '',
            lastname: '',
            email: '',
        };
    }

    static navigationOptions = {
        headerMode: 'screen',
        title: 'Inscription'
    };

    rsp = undefined

    onLogin() {
        const {firstname, lastname, email, password} = this.state;

        fetch("https://api.kineplus.tech/register", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstname": firstname,
                "lastname": lastname
            })
        }).then((response) => {
            if (response.ok.toString() === "true") {
                response.json().then((responseJson) => {
                    this.props.navigation.goBack()
                })
            } else
                Alert.alert(
                    'Erreur',
                    'Merci de verifier la saisie des champs',
                    [
                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ],
                    {cancelable: false}
                )
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 40
            }}>
                <TextField
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({lastname})}
                    label={'Nom'}
                />
                <TextField
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({firstname})}
                    label={'Prénom'}
                />
                <TextField
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    label={'Mot de Passe'}
                    secureTextEntry={true}
                />
                <TextField
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    label={'Email'}
                />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#58A4B0',
                        padding: 10
                    }}
                    onPress={() => this.onLogin()}
                >
                    <Text style={{color: 'white'}}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        );
    }

}