import React, {Component} from 'react';
import {TextInput, View, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {TextField} from 'react-native-material-textfield';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    static navigationOptions = {
        headerMode: 'screen',
        title: 'Se connecter'
    };



    rsp = undefined

    onLogin() {
          const {username, password} = this.state;

        fetch("https://api.kineplus.tech/login", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        }).then((response) => {
            if (response.ok.toString() === "true") {
                response.json().then((responseJson) => {
                    console.log(responseJson.token)
                    global.token = responseJson.token
                    this.setState({password:""})
                    this.props.navigation.navigate('Main')
                })
            } else
                Alert.alert(
                    'Mauvais identifiant',
                    'Identifiant ou mot de passe incorrect',
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
                <View style={{alignItems: 'center',}}>
                    <Image source={require('../assets/images/splash.png')}/>
                </View>
                <TextField
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                    label={'Username'}
                />
                <TextField
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    label={'Password'}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#58A4B0',
                        padding: 10
                    }}
                    onPress={() => this.onLogin()}
                >
                    <Text style={{color: 'white'}}>Connection</Text>
                </TouchableOpacity>
                <View style={{height: 20}}/>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#58A4B0',
                        padding: 10
                    }}
                    onPress={() => this.props.navigation.navigate('MDP')}
                >
                    <Text style={{color: 'white'}}>Mot de passe oublié</Text>
                </TouchableOpacity>
                <View style={{height: 20}}/>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#58A4B0',
                        padding: 10
                    }}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={{color: 'white'}}>S'incrire</Text>
                </TouchableOpacity>
            </View>
        );
    }

}