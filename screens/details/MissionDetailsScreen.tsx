import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    ListRenderItemInfo,
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet, Alert,
} from 'react-native';
import {
    Button,
    Card,
    Icon, Layout,
    List,
    Text,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ArrowIosBackIcon, BookmarkIcon, BookmarkOutlineIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Product, ProductOption} from './extra/data';
import {ClockIcon} from "../dash/extra/icons";

export default ({navigation}): React.ReactElement => {
    let product = navigation.getParam('mission', null)
    let isNotif = navigation.getParam('isNotif', null)

    const safeArea = useSafeArea();
    const [bookmarked, setBookmarked] = React.useState<boolean>(false);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#F7F9FC',
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
        image: {
            height: 360,
        },
        bookingCard: {
            marginTop: -80,
            margin: 16,
        },
        title: {
            width: '65%',
        },
        rentLabel: {
            marginTop: 24,
        },
        priceLabel: {
            marginTop: 8,
        },
        bookButton: {

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
        optionList: {
            flexDirection: 'row',
            marginHorizontal: -4,
            marginVertical: 8,
        },
        optionItem: {
            marginHorizontal: 4,
            paddingHorizontal: 0,
        },
        description: {
            marginHorizontal: 16,
            marginVertical: 8,
        },
        sectionLabel: {
            marginHorizontal: 16,
            marginVertical: 8,
        },
        imagesList: {
            padding: 8,
            backgroundColor: '#F7F9FC',
        },
        imageItem: {
            width: 180,
            height: 120,
            borderRadius: 8,
            marginHorizontal: 8,
        },
    });

    const onDecline = (data): void => {
        fetch(global.BaseUrl + "/editnotification", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": data._id,
                "decline": true
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert("Mission Refusée", "Mission refusé !" , [
                        { text: "OK", onPress: () => navigation.goBack(null) }
                    ],
                    { cancelable: false })
            }).catch((error) => {
            console.error(error);
        });
    };

    const onBookButtonPress = (item): void => {
        fetch(global.BaseUrl + "/editmission", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": item._id,
                "statusNb": 2
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert("Mission Terminée", "Votre mission est maintenant passée en status terminée" , [
                        { text: "OK", onPress: () => navigation.goBack(null) }
                    ],
                    { cancelable: false })
            }).catch((error) => {
            console.error(error);
        });
    };


    const renderBookmarkAction = (navigation): React.ReactElement => (
        <TopNavigationAction
            icon={BookmarkIcon}
            onPress={()=> navigation.navigate('Help')}
        />
    );

    const renderImageItem = (item): React.ReactElement => {
        console.log(item.item.compact_url)
        return(
        <Image
            style={styles.imageItem}
            source={{uri:item.item.compact_url}}
        />
    );}

    const renderOptionItemIcon = (style: ImageStyle, icon: string): React.ReactElement => (
        <Icon {...style} name={icon}/>
    );

    const renderOptionItem = (option: ProductOption, index: number): React.ReactElement => (
        <Button
            key={index}
            style={styles.optionItem}
            appearance='ghost'
            size='small'
            icon={(style: ImageStyle) => renderOptionItemIcon(style, option.icon)}>
            {option.title}
        </Button>
    );

    const renderDetailItem = (detail: string, index: number): React.ReactElement => (
        <Button
            key={index}
            style={styles.detailItem}
            appearance='outline'
            size='tiny'>
            {detail}
        </Button>
    );

    const onAccept = (data): void => {
        console.log(data._id)
        fetch(global.BaseUrl + "/editnotification", {
            method: 'POST',
            headers: {
                "Authorization": global.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": data._id,
                "decline": false
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                Alert.alert("Mission Acceptée", "Mission ajouté au mission en cour !", [
                        { text: "OK", onPress: () => navigation.goBack(null) }
                    ],
                    { cancelable: false })
            }).catch((error) => {
            console.error(error);
        });
    };

    const renderBookingFooter = (): React.ReactElement => (
        <View>
            <Text
                category='s1'>
                Info
            </Text>
            <View style={styles.detailsList}>
                {[
                    product.item.name
                ].map(renderDetailItem)}
            </View>
            <Text
                category='s1'>
                Localisation
            </Text>
            <Text
                category='s2'>
                {product.item.house.address1}
            </Text>
            <Layout
                style={styles.itemStyxContainer}
                level='2'>
                <Text
                    style={styles.itemStyxText}
                    category='h6'>
                    {product.item.city}
                </Text>
                <Button
                    style={styles.itemStyxButton}
                    size='tiny'
                    icon={ClockIcon}>
                    {`55 Km`}
                </Button>
            </Layout>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <ImageOverlay
                style={[styles.image, {paddingTop: safeArea.top}]}
                source={{uri: product.item.img}}>
                <TopNavigation
                    appearance='control'
                    rightControls={renderBookmarkAction(navigation)}
                />
            </ImageOverlay>
            <Card
                style={styles.bookingCard}
                appearance='filled'
                footer={renderBookingFooter}>
                <Text
                    style={styles.title}
                    category='h6'>
                    {product.item.house.name}
                </Text>
                <Text
                    style={styles.rentLabel}
                    appearance='hint'
                    category='p2'>
                    Rémunération
                </Text>
                <Text
                    style={styles.priceLabel}
                    category='h6'>
                    {product.item.deal}€
                </Text>
                <Text
                    style={styles.rentLabel}
                    appearance='hint'
                    category='p2'>
                    Date entrée:
                </Text>
                <Text>le {product.item.booking.start_at.split('T')[0]}</Text>
                <Text>à {product.item.booking.start_at.split('T')[1].split('.')[0].slice(0, -3)} heure</Text>
                <Text
                    style={styles.rentLabel}
                    appearance='hint'
                    category='p2'>
                    Date sortie:
                </Text>
                <Text>le {product.item.booking.end_at.split('T')[0]}</Text>
                <Text>à {product.item.booking.end_at.split('T')[1].split('.')[0].slice(0, -3)} heure</Text>
                {isNotif == false ?
                    <Button
                        disabled={(product.item.status == 'DONE' || product.item.status == 'CANCELED')}
                        style={styles.bookButton}
                        onPress={() => onBookButtonPress(product.item)}>
                        Terminée
                    </Button>
                    :
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        right: 24,}}>
                        <Button
                            onPress={() => onAccept(product)}
                            style={styles.bookButton}>
                            Accepter
                        </Button>
                        <Button
                            onPress={() => onDecline(product)}
                            style={styles.bookButton}>
                            Refuser
                        </Button>
                    </View>}
            </Card>
            <Text
                style={styles.sectionLabel}
                category='s1'>
                A Propos
            </Text>
            <Text
                style={styles.description}
                appearance='hint'>
                {product.item.object}
            </Text>
            <Text
                style={styles.sectionLabel}
                category='s1'>
                Photos
            </Text>
            <List
                contentContainerStyle={styles.imagesList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={product.item.house.photos}
                renderItem={renderImageItem}
            />
        </ScrollView>
    );
};
