import React from 'react';
import View from "react-native-web/dist/exports/View";
import Text from "react-native-web/dist/exports/Text";

export default class Bilan extends React.Component {
    render() {
        return (
            <View>
                <Text>Bilan du nombre de missions réalisés</Text>
                <Text>Bilan du chiffre d’affaire généré</Text>
            </View>
        )
    }
}