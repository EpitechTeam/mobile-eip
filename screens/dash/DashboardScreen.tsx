import React from 'react';
import {Alert, ListRenderItemInfo, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Card, Input, Layout, List, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ArrowIosBackIcon, ClockIcon, CloseIcon, HeartIcon, PlusIcon, SearchIcon, ShareIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Training} from './extra/data';
import {Product} from "../details/extra/data";

export default ({navigation}): React.ReactElement => {

    const [data, setData] = React.useState(null);
    const [query, setQuery] = React.useState<string>('');
    const onInputIconPress = (): void => {
        setQuery('');
    };
    const onEndInput = (): void => {
        fetch(global.BaseUrl + "/mission", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "city": query,
            })
        }).then((response) => {
            console.log(response)
            setData([{
                "name": "Appartement Témoin",
                "city": "Montpellier",
                "img": "https://edito.seloger.com/sites/default/files/styles/manual_crop_1440x480/public/page_garde_guide/image/location-appartement-guide-seloger.jpg?itok=OtCuI5sf&c=d63190d171fd783906d17365aba288bf",
                "deal": 200,
                "objectID": "469443101",
                "_highlightResult": {
                    "name": {"value": "Appartement Témoin", "matchLevel": "none", "matchedWords": []},
                    "city": {
                        "value": "<em>Montpellier</em>",
                        "matchLevel": "full",
                        "fullyHighlighted": true,
                        "matchedWords": ["montpellier"]
                    },
                    "img": {
                        "value": "https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "deal": {"value": "200", "matchLevel": "none", "matchedWords": []}
                }
            }, {
                "name": "Appartement Témoin n°2",
                "city": "Montpellier",
                "img": "https://edito.seloger.com/sites/default/files/styles/manual_crop_1440x480/public/page_garde_guide/image/location-appartement-guide-seloger.jpg?itok=OtCuI5sf&c=d63190d171fd783906d17365aba288bf",
                "deal": 200,
                "objectID": "750905804",
                "_highlightResult": {
                    "name": {
                        "value": "Appartement Témoin n°2",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "city": {
                        "value": "<em>Montpellier</em>",
                        "matchLevel": "full",
                        "fullyHighlighted": true,
                        "matchedWords": ["montpellier"]
                    },
                    "img": {
                        "value": "https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "deal": {"value": "200", "matchLevel": "none", "matchedWords": []}
                }
            }, {
                "name": "Appartement Témoin n°3",
                "city": "Montpellier",
                "img": "https://edito.seloger.com/sites/default/files/styles/manual_crop_1440x480/public/page_garde_guide/image/location-appartement-guide-seloger.jpg?itok=OtCuI5sf&c=d63190d171fd783906d17365aba288bf",
                "deal": 200,
                "objectID": "679072032",
                "_highlightResult": {
                    "name": {
                        "value": "Appartement Témoin n°3",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "city": {
                        "value": "<em>Montpellier</em>",
                        "matchLevel": "full",
                        "fullyHighlighted": true,
                        "matchedWords": ["montpellier"]
                    },
                    "img": {
                        "value": "https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "deal": {"value": "200", "matchLevel": "none", "matchedWords": []}
                }
            }])
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
            navigation.navigate('Details', {mission: info})
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
            <TopNavigation
                alignment='center'
                title='Feed'
                leftControl={renderBackAction()}
                rightControls={renderMapAction()}
            />
            <Input
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                onEndEditing={onEndInput}
                placeholder='Search'
                icon={query ? CloseIcon : SearchIcon}
                onIconPress={onInputIconPress}
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
