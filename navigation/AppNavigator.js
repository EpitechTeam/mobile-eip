import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../screens/sign-in/Login.tsx';

import MainTabNavigator from './MainTabNavigator';
import ForgotPassword from "../screens/forgot-password/ForgotPassword.tsx";
import ProfileScreen from "../screens/profil/ProfileScreen";
import Icon from 'react-native-vector-icons/Feather';
import RegisterScreen from "../screens/sign-up/RegisterScreen.tsx";
import ProfileSettings from "../screens/profile-settings/ProfileSettings";
import Help from "../screens/Help";


const Stack = createStackNavigator({
    Main: {
        screen: MainTabNavigator,
        headerMode: "none",
        navigationOptions: {
            header: null,
        },
    },
    Profil: ProfileScreen,
    Help : Help,
    ProfileSettings: ProfileSettings
}, { headerMode: "none",
    navigationOptions: {
        header: null,
    },
});

const Ap = createStackNavigator({
    Login: Login,
    MDP: ForgotPassword,
    Register: RegisterScreen,
    Dash: Stack,
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
})

export default createAppContainer(Ap);
