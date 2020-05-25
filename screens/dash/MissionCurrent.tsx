import React from 'react';
import {
    Alert,
    ListRenderItemInfo,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Vibration,
    Platform, BackHandler, AsyncStorage
} from 'react-native';
import {Button, Card, Input, Layout, List, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ArrowIosBackIcon, ClockIcon, CloseIcon, HeartIcon, PlusIcon, SearchIcon, ShareIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Training} from './extra/data';
import {Product} from "../details/extra/data";
import {NavigationEvents} from "react-navigation";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const registerForPushNotificationsAsync = async (): Promise<void> => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return;
        }
        Notifications.getExpoPushTokenAsync().then((resp) => {
            fetch(global.BaseUrl + "/me", {
                method: "POST",
                headers: {
                    Authorization: global.token,
                    "content-type": "application/json",
                },
                body: JSON.stringify({}),
            })
                .then((response) => {
                    response.json().then((responseJson) => {
                        console.log(responseJson.email);

                        fetch(global.BaseUrl + "/putDeviceId", {
                            method: "POST",
                            headers: {
                                Authorization: global.token,
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({
                                email: responseJson.email,
                                deviceId: resp,
                            }),
                        })
                            .then((response) => {
                                response.json().then((responseJson) => {});
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log(resp);
        });
    }

    if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250],
        });
    }
};

const handleNotification = (notification) => {
    Vibration.vibrate(0, false);
    console.log(notification);
};

registerForPushNotificationsAsync()
    .then((resp) => {
        Notifications.addListener(handleNotification);
    })
    .catch((error) => {
        console.log(error);
    });


export default ({navigation}): React.ReactElement => {

    const [data, setData] = React.useState(null);
    const [expoPushToken, setExpoPushToken] = React.useState<string>("");
    const [query, setQuery] = React.useState<string>('');
    const onInputIconPress = (): void => {
        setQuery('');
    };
    const onEndInput = (): void => {
        fetch(global.BaseUrl + "/getmission", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "content-type": "application/json",
            },
            body: JSON.stringify({_id:global._id})
        }).then((response) => {
            response.json().then((responseJson) => {
                let filteredItems = responseJson.filter(function(item) {
                    return item.status === "CURRENT"
                })
                setData(filteredItems)
            })
        }).catch((error) => {
            console.error(error);
        });
    };
    const safeArea = useSafeArea();

    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={() => {
                navigation.navigate('Profil')
            }}
        />
    );

    const renderMapAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={HeartIcon}
            onPress={() => {
                AsyncStorage.removeItem("token").then(()=>{navigation.popToTop();
                navigation.goBack(null);})
            }}
        />
    );

    const renderItemHeader = (info): React.ReactElement => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Details', {mission: info, isNotif: false})
        }}>
            <ImageOverlay
                style={styles.itemHeader}
                source={{uri: info.item.img}}>
                <View style={styles.itemHeaderDetails}>
                    <Text
                        category='h4'
                        status='control'>
                        {`${info.item.house.name}`}
                    </Text>
                </View>
                <Text
                    style={{paddingTop: 50}}
                    category='s1'
                    status='control'>
                    {`Mission d'une durée de ${info.item.object}`}
                </Text>
                <Text
                    style={{paddingTop: 50}}
                    category='s1'
                    status='control'>
                    {`${info.item.date}`}
                </Text>
            </ImageOverlay>
        </TouchableOpacity>
    );

    const renderItemFooter = (info): React.ReactElement => (
        <View style={styles.itemFooter}>
            <View style={styles.itemReactionsContainer}>
                <Text
                    style={{}}>
                    Rémunération
                </Text>
            </View>
            <Text
                style={{}}>
                {`${info.item.deal} €`}
            </Text>
        </View>
    );

    const product: Product = Product.centralParkApartment();

    const renderDetailItem = (detail: string): React.ReactElement => (
        <Button
            style={styles.detailItem}
            appearance='outline'
            size='tiny'>
            {detail}
        </Button>
    );


    const renderItem = (info): React.ReactElement => (

        <Card
            style={styles.item}
            header={() => renderItemHeader(info)}
            footer={() => renderItemFooter(info)}>
            <Layout
                style={styles.itemStyxContainer}
                level='2'>
                <Text
                    style={styles.itemStyxText}
                    category='h6'>
                    {`${info.item.city}`}
                </Text>
                <Button
                    style={styles.itemStyxButton}
                    size='tiny'
                    icon={ClockIcon}>
                    {`5 Km`}
                </Button>
            </Layout>
            <View style={styles.detailsList}>
                {renderDetailItem(info.item.name)}
            </View>
        </Card>
    );

    return (
        <Layout
            style={[styles.container, {paddingTop: safeArea.top}]}
            level='2'>
            <NavigationEvents
                onWillFocus={payload => onEndInput()}
            />
                <List
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
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
    searchInput: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    list: {
        flex: 1,
    },
    detailsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginVertical: 8,
    },
    detailItem: {
        marginTop: 5,
        marginHorizontal: 4,
        borderRadius: 16,
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
