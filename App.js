import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


import AppNavigator from './navigation/AppNavigator';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {mapping, light as lightTheme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

global.BaseUrl = "https://api.willally.com"
global.token = ""
global._id = ""

export default function App(props) {

    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider mapping={mapping} theme={lightTheme}>
                    <SafeAreaProvider>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <SafeAreaView style={{flex:1}}>
                            <AppNavigator/>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </ApplicationProvider>
            </React.Fragment>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
