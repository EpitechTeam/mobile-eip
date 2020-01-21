import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {Button, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Card, Icon} from "react-native-elements";
import {Layout, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {ArrowIosBackIcon} from "./dash/extra/icons";
import {useSafeArea} from "./dash/extra/3rd-party";

const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
        icon={ArrowIosBackIcon}
        onPress={() => {
        }}
    />
);

export default class ExercicesScreen extends React.Component {

    static navigationOptions = {
        header: null
    };


    render() {
        return (

            <Layout
                style={[styles.container, {paddingTop: StatusBar.currentHeight}]}
                level='2'>
                <TopNavigation
                    alignment='center'
                    title='Feed'
                    leftControl={renderBackAction()}
                />
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
                    renderItem={({item}) => (<TouchableOpacity onPress={() => {
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
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    item: {
        marginVertical: 8,
    },
    itemHeader: {
        minHeight: 220,
        padding: 24,
    },
    itemHeaderDetails: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemStyxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        marginHorizontal: -8,
    },
    itemStyxText: {
        marginHorizontal: 16,
        marginVertical: 14,
    },
    itemStyxButton: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 24,
    },
    itemDescription: {
        marginHorizontal: -8,
        marginTop: 16,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemReactionsContainer: {
        flexDirection: 'row',
    },
    itemAddButton: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 0,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});
