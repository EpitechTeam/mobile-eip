import React from 'react';
import {ImageBackground, ListRenderItemInfo, ScrollView, StyleSheet, View, YellowBox} from 'react-native';
import {Avatar, Button, Card, Layout, List, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ProfileSocial} from './extra/profile-social.component';
import {ArrowIosBackIcon, MessageCircleIcon, PersonAddIcon, PinIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Post, Profile} from './extra/data';
import {RateBar} from "./rate-bar.component";
import {NavigationEvents} from "react-navigation";


export default class ProfileScreen extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    state = {profile: {img: "http://blog.ubeeqo.be/images/users/default_user.png"}, bilan: {labels: [], data: []}}

    onSettingsButtonPress = (): void => {
        this.props.navigation && this.props.navigation.navigate('ProfileSettings', {profile: this.state.profile});
    };

    componentWillMount() {
        fetch(global.BaseUrl + "/me", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + global.token,
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState(previousState => (
                    {profile: responseJson, previousState}
                ))
                return;
            }).catch((error) => {
            console.error(error);
        });
        fetch(global.BaseUrl + "/getstats", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + global.token,
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState(previousState => (
                    {stats: responseJson, previousState}
                ))
                return;
            }).catch((error) => {
            console.error(error);
        });
    }

    renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={() => {
                this.props.navigation.goBack()
            }}
        />
    );

    render() {

        return (
            <Layout
                style={[styles.container, {paddingTop: 30}]}
                level='2'>
                <NavigationEvents
                    onWillFocus={payload => this.componentWillMount()}
                />
                <TopNavigation
                    alignment='center'
                    title='Profile'
                    leftControl={this.renderBackAction()}
                />
                <ScrollView style={styles.container}>
                    <ImageOverlay
                        style={styles.header}
                        source={require('./assets/image-background.jpg')}>
                        <Avatar
                            style={styles.profileAvatar}
                            source={{uri: this.state.profile.img}}
                        />
                        <Text
                            style={styles.profileName}
                            category='h5'
                            status='control'>
                            {this.state.profile.firstname} {this.state.profile.lastname}
                        </Text>
                        <View style={styles.locationContainer}>
                            <PinIcon/>
                            <Text
                                style={styles.location}
                                status='control'>
                                {this.state.profile.city}
                            </Text>
                        </View>
                        <View style={styles.profileButtonsContainer}>
                            <Button
                                style={styles.profileButton}
                                status='control'
                                icon={MessageCircleIcon}
                                onPress={this.onSettingsButtonPress}>
                                SETTINGS
                            </Button>
                        </View>
                        <View style={styles.socialsContainer}>
                            <ProfileSocial
                                style={styles.profileSocial}
                                hint='Mission réalisée'
                                value={`50`}
                            />
                            <ProfileSocial
                                style={styles.profileSocial}
                                hint='Like'
                                value={`35`}
                            />
                        </View>
                        <RateBar
                            style={styles.rateBar}
                            hint='Experience'
                            value={4}
                            onValueChange={() => {
                            }}
                        />
                    </ImageOverlay>
                    <Text
                        style={styles.sectionLabel}
                        category='s1'>
                        Description
                    </Text>
                    <Text
                        style={styles.profileDescription}
                        appearance='hint'>
                        {this.state.profile.bio}
                    </Text>
                    <Text
                        style={styles.sectionLabel}
                        category='s1'>
                        Flexibilité sur mission
                    </Text>
                    <Text
                        style={styles.profileDescription}
                        appearance='hint'>
                        {this.state.profile.missions ? this.state.profile.missions.map((item, i) => this.renderMissionElem(item, i)) : this.state.profile.mission}
                    </Text>
                    <Text
                        style={styles.sectionLabel}
                        category='s1'>
                        Services Proposée
                    </Text>
                    <View style={styles.detailsList}>
                        {this.state.profile.skills ? this.state.profile.skills.map((item, i) => this.renderDetailItem(item, i)) : this.state.profile.skills}
                    </View>
                    <View>
                        {this.state.stats ? this.state.stats.data.map((item, i) => this.renderDetail(item, i)) : this.state.stats}
                    </View>
                </ScrollView>
            </Layout>
        );
    }

    private renderDetailItem(detail: string, index: number) {
        return (
            <Button
                key={index}
                style={styles.detailItem}
                appearance='outline'
                size='tiny'>
                {detail}
            </Button>)
    }

    private renderDetail(detail: string, index: number) {
        if (index < 11)
        return (
            <View>
                <Text   style={styles.profileDescription}>{this.state.stats.labels[index]}: {this.state.stats.data[index]}€</Text>
            </View>
                )
    }

    private renderBilanItem() {
        return (
            this.state.bilan.labels.map((item, i) => {
                this.renderBilan(item, i)
                this.renderBilan(this.state.bilan.data[i], i)
                this.renderNl()
            }))
    }


    private renderNl() {
        return (
            <Text
                style={styles.profileDescription}
                appearance='hint'>
                {"\n"}
            </Text>
        )
    }

    private renderBilan(detail: string, index: number) {
        console.log(detail)
        return (
            <Text
                key={index}
                style={styles.profileDescription}
                appearance='hint'>
                {detail}
            </Text>
        )
    }

    private renderMissionElem(item, index) {
        return (
            <Text
                key={index}
                style={styles.profileDescription}
                appearance='hint'>
                {item.description}{"\n"}
            </Text>)
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailItem: {
        marginTop: 5,
        marginHorizontal: 4,
        borderRadius: 16,
    },
    detailsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    rateBar: {
        marginTop: 24,
    },
    header: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    profileAvatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        marginVertical: 16,
    },
    profileName: {
        zIndex: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginVertical: 8,
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        marginVertical: 32,
        marginHorizontal: 20,
    },
    profileButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    socialsContainer: {
        flexDirection: 'row',
        width: '75%',
        marginVertical: 8,
    },
    profileSocial: {
        flex: 1,
    },
    sectionLabel: {
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 16,
    },
    profileDescription: {
        marginHorizontal: 16,
    },
    friendsList: {
        marginHorizontal: 8,
    },
    friendItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    friendName: {
        marginTop: 8,
    },
    postItem: {
        flex: 1,
        aspectRatio: 1.0,
    },
});

