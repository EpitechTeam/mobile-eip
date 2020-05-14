import React from 'react';
import {
    Alert,
    ListRenderItemInfo,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Button, Card, Input, Layout, List, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ArrowIosBackIcon, ClockIcon, CloseIcon, HeartIcon, PlusIcon, SearchIcon, ShareIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Training} from './extra/data';
import {Product} from "../details/extra/data";
import {NavigationEvents} from "react-navigation";

export default ({navigation}): React.ReactElement => {

    const [data, setData] = React.useState(null);
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
            body: JSON.stringify({})
        }).then((response) => {
            response.json().then((responseJson) => {
                setData(responseJson)
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
                navigation.navigate('Map')
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
                        {`${info.item.name}`}
                    </Text>
                </View>
                <Text
                    style={{paddingTop: 50}}
                    category='s1'
                    status='control'>
                    {`Mission d'une durée de ${info.item.time} j`}
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

    const renderDetailItem = (detail: string, index: number): React.ReactElement => (
        <Button
            key={index}
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
                {product.details.map(renderDetailItem)}
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
            <TopNavigation
                alignment='center'
                title='Feed'
                leftControl={renderBackAction()}
                rightControls={renderMapAction()}
            />
            <View style={{flex:1}}>
                <List
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    data={data}
                    ListHeaderComponent={   <TopNavigation
                        alignment='center'
                        title='Mission En Cour'
                    />}
                    stickyHeaderIndices={[0]}
                    renderItem={renderItem}
                />
                <TopNavigation
                    alignment='center'
                    title='Mission Terminée'
                />
                <List
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    data={data}
                    renderItem={renderItem}
                />
            </View>
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
