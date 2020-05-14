import React from 'react';
import {Alert, AsyncStorage, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {NavigationEvents} from "react-navigation";

export default ({navigation}): React.ReactElement => {

    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);


    const onSignUpButtonPress = (): void => {
        navigation && navigation.navigate('Register');
    };


    const onForgotPasswordButtonPress = (): void => {
        navigation && navigation.navigate('MDP');
    };

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    function onLogin() {
        console.log(email + " " + password)
        fetch(global.BaseUrl + "/login", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then((response) => {
            if (response.ok.toString() === "true") {
                response.json().then((responseJson) => {
                    let _storeData;
                    _storeData = async () => {
                        try {
                            await AsyncStorage.setItem('token', responseJson.token);
                        } catch (error) {
                            // Error saving data
                        }
                    };
                    _storeData()
                    global.token = responseJson.token
                    navigation.navigate('Main')
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

    return (
        <KeyboardAvoidingView>
            <NavigationEvents
                onWillFocus={payload => {
                    let _retrieveToken;
                    _retrieveToken = async () => {
                        try {
                            const value = await AsyncStorage.getItem('token');
                            console.log(value);
                            if (value !== null) {
                                global.token = value
                                navigation.navigate('Main')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    };
                    _retrieveToken()
                }}/>
            <ImageOverlay
                style={styles.container}
                source={require('./assets/image-background.jpg')}>
                <View style={styles.headerContainer}>
                    <Text
                        category='h1'
                        status='control'>
                        Bonjour
                    </Text>
                    <Text
                        style={styles.signInLabel}
                        category='s1'
                        status='control'>
                        Connecter vous a votre compte
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        status='control'
                        placeholder='Email'
                        icon={PersonIcon}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        style={styles.passwordInput}
                        status='control'
                        placeholder='Password'
                        icon={passwordVisible ? EyeIcon : EyeOffIcon}
                        value={password}
                        secureTextEntry={!passwordVisible}
                        onChangeText={setPassword}
                        onIconPress={onPasswordIconPress}
                    />
                    <View style={styles.forgotPasswordContainer}>
                        <Button
                            style={styles.forgotPasswordButton}
                            appearance='ghost'
                            status='control'
                            onPress={onForgotPasswordButtonPress}>
                            Mot de passe oublié ?
                        </Button>
                    </View>
                </View>
                <Button
                    style={styles.signInButton}
                    status='control'
                    size='giant'
                    onPress={onLogin}>
                    SIGN IN
                </Button>
                <Button
                    style={styles.signUpButton}
                    appearance='ghost'
                    status='control'
                    onPress={onSignUpButtonPress}>
                    Vous n'avez pas de compte? Inscrivez vous
                </Button>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    formContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});

