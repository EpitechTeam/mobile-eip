import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Input} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {EmailIcon, EyeIcon, EyeOffIcon, PersonIcon, PlusIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';

export default ({navigation}): React.ReactElement => {

    const [userName, setUserName] = React.useState<string>();

    const [userName1, setUserName1] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 216,
        },
        profileAvatar: {
            width: 116,
            height: 116,
            borderRadius: 58,
            alignSelf: 'center',
            backgroundColor: 'transparent',
            tintColor: '#8F9BB3',
        },
        editAvatarButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        formContainer: {
            flex: 1,
            paddingTop: 32,
            paddingHorizontal: 16,
        },
        formInput: {
            marginTop: 16,
        },
        termsCheckBox: {
            marginTop: 24,
        },
        termsCheckBoxText: {
            color: '#FFFFFF',
        },
        signUpButton: {
            marginHorizontal: 16,
        },
        signInButton: {
            marginVertical: 12,
            marginHorizontal: 16,
        },
    });

    const onSignUpButtonPress = (): void => {

        fetch(global.BaseUrl + "/register", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "type": "freelance",
                "img": "https://assurewealth.com.au/wp-content/uploads/2016/08/bwlionroar-350x350.jpg",
                "password": password,
                "firstname": userName,
                "lastname": userName1
            })
        }).then((response) => {
            if (response.ok.toString() === "true") {
                response.json().then((responseJson) => {
                    navigation.goBack()
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

    const onSignInButtonPress = (): void => {
        navigation && navigation.navigate('Login');
    };

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    const renderEditAvatarButton = (): React.ReactElement => (
        <Button
            style={styles.editAvatarButton}
            status='basic'
            icon={PlusIcon}
        />
    );

    return (
        <KeyboardAvoidingView>
            <ImageOverlay
                style={styles.container}
                source={require('./assets/image-background.jpg')}>
                <View style={styles.headerContainer}>
                    <ProfileAvatar
                        style={styles.profileAvatar}
                        resizeMode='center'
                        source={require('./assets/image-person.png')}
                        editButton={renderEditAvatarButton}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input
                        status='control'
                        autoCapitalize='none'
                        placeholder='Prénom'
                        icon={PersonIcon}
                        value={userName}
                        onChangeText={setUserName}
                    />
                    <Input
                        status='control'
                        autoCapitalize='none'
                        placeholder='Nom'
                        icon={PersonIcon}
                        value={userName1}
                        onChangeText={setUserName1}
                    />
                    <Input
                        style={styles.formInput}
                        status='control'
                        autoCapitalize='none'
                        placeholder='Email'
                        icon={EmailIcon}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        style={styles.formInput}
                        status='control'
                        autoCapitalize='none'
                        secureTextEntry={!passwordVisible}
                        placeholder='Mot de passe'
                        icon={passwordVisible ? EyeIcon : EyeOffIcon}
                        value={password}
                        onChangeText={setPassword}
                        onIconPress={onPasswordIconPress}
                    />
                    <CheckBox
                        style={styles.termsCheckBox}
                        textStyle={styles.termsCheckBoxText}
                        text='I read and agree to Terms & Conditions'
                        checked={termsAccepted}
                        onChange={(checked: boolean) => setTermsAccepted(checked)}
                    />
                </View>
                <Button
                    style={styles.signUpButton}
                    size='giant'
                    onPress={onSignUpButtonPress}>
                    SIGN UP
                </Button>
                <Button
                    style={styles.signInButton}
                    appearance='ghost'
                    status='control'
                    onPress={onSignInButtonPress}>
                    Already have an account? Sign In
                </Button>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

