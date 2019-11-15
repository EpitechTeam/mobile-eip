import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Button,
    View, Alert,
} from 'react-native';
import {Avatar, Text} from 'react-native-elements';


export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    constructor(c) {
        super(c);
        this.state = {
            firstname: null,
            lastname: null,
            email: null
        }
    }

    componentWillMount() {
        fetch("https://api.kineplus.tech/me", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + global.token,
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    firstname: responseJson.firstname, lastname: responseJson.lastname,
                    email: responseJson.email
                })
                return;
            }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: '#ffffff',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <View>
                    <Avatar
                        xlarge
                        size={250}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text style={{
                        fontSize: 25,
                        alignSelf: 'center'
                    }}>{this.state.firstname} {this.state.lastname}</Text>
                </View>
                <View/>
                <View/>
                <View/>
                <View/>
                <View style={{paddingTop: 60}}>
                    <Text style={{fontSize: 17}}>Adresse mail: </Text>
                    <Text style={{fontSize: 14}}>{this.state.email}</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
