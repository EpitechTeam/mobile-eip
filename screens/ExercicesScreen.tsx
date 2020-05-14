import React from 'react';
import {Button, Icon, Layout, List, ListItem, TopNavigation} from '@ui-kitten/components';
import {Alert, ListRenderItemInfo, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useSafeArea} from "./dash/extra/3rd-party";
import {NavigationActions, NavigationEvents} from "react-navigation";


export default ({navigation}): React.ReactElement => {

    const [data, setData] = React.useState(null);

    const onAccept = (index): void => {
        console.log(data[index]._id)
        fetch(global.BaseUrl + "/editnotification", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": data[index]._id,
                "decline": false
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                Alert.alert("Mission Acceptée", "Mission ajouté au mission en cour !")
            }).catch((error) => {
            console.error(error);
        });
    };

    const onDecline = (index): void => {
        fetch(global.BaseUrl + "/editnotification", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": data[index]._id,
                "decline": true
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert("Mission Refusée", "Mission refusé !")
            }).catch((error) => {
            console.error(error);
        });
    };

    const renderItemAccessory = (style, index) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Button onPress={() => onAccept(index)} style={style}>Accept</Button>
                <Button onPress={() => onDecline(index)} style={style}>Decline</Button>
            </View>
        );
    }

    const renderItemIcon = (style) => (
        <Icon {...style} name='person'/>
    );


    const renderItem = ({item, index}): React.ReactElement => (
        <ListItem
            onPress={() => {
                let mission = {item: null}
                mission.item = item.mission_id
                navigation.navigate('Details', {mission: mission, isNotif: true})
            }}
            title={`${item.mission_id.name}`}
            description={`${item.mission_id.houseOwner}`}
            icon={renderItemIcon}
            accessory={(style, index) => renderItemAccessory(style, index)}
        />

    );

    const onEndInput = (): void => {
        fetch(global.BaseUrl + "/getnotification", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "content-type": "application/json",
            },
            body: JSON.stringify({})
        }).then((response) => {
            console.log(response)
            response.json().then((responseJson) => {
                setData(responseJson)
            })
        }).catch((error) => {
            console.error(error);
        });
    };

    const safeArea = useSafeArea();
    return (
        <Layout
            style={[styles.container, {paddingTop: safeArea.top}]}
            level='2'>
            <NavigationEvents
                onWillFocus={payload => onEndInput()}
            />
            <TopNavigation
                alignment='center'
                title='Feed'
            />
            <List
                style={styles.container}
                data={data}
                renderItem={renderItem}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});