import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ProfileSetting} from './extra/profile-setting.component';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ArrowIosBackIcon, CameraIcon} from './extra/icons';
import {useSafeArea} from './extra/3rd-party';
import {Profile} from './extra/data';

export default ({navigation}): React.ReactElement => {

    let profile = navigation.getParam('profile', null)
    const safeArea = useSafeArea();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        photoSection: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
        },
        photo: {
            aspectRatio: 1.0,
            height: 76,
        },
        photoButton: {
            aspectRatio: 1.0,
            height: 32,
            borderRadius: 16,
        },
        nameSection: {
            flex: 1,
            marginHorizontal: 8,
        },
        description: {
            padding: 24,
            backgroundColor: '#FFFFFF',
        },
        doneButton: {
            margin: 24,
        },
        setting: {
            padding: 16,
        },
        emailSetting: {
            marginTop: 24,
        },
    });


    const onDoneButtonPress = (): void => {
        console.log(global.firstname)
        fetch(global.BaseUrl + "/edit", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": global.token,
            },
            body:JSON.stringify({
                "email":  global.email,
                "firstname": global.firstname,
                "lastname":  global.lastname ,
                "caption": "Freelance Montpellier",
                "img": "https://assurewealth.com.au/wp-content/uploads/2016/08/bwlionroar-350x350.jpg",
                "city":    global.city ,
                "location": "Montpellier, France",
                "company": "SFR",
                "phone":  global.phone,
                "siret": global.siret,
                "skills": ["Accueil", "Animation", "Piscine", "Courses", "Jardinage"],
                "missions": [
                    {"label": "Déplacement", "description": "Déplacement sur lieux de propriétés dans toute la France métropole"},
                    {"label": "Compétences", "description": "Recherche des missions en gîtes"},
                    {"label": "Durée de mission", "description": "Recherche des missions ~3-6 mois"}
                ],
                "bio": "Expérience dans l'hôtellrie ainsi que la gestion de multiple propriétés, c'est ma passion !"
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                navigation.goBack()
                return;
            }).catch((error) => {
            console.error(error);
        });
    };

    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={navigation && navigation.goBack}
        />
    );

    const renderPhotoButton = (): React.ReactElement => (
        <Button
            style={styles.photoButton}
            size='small'
            status='basic'
            icon={CameraIcon}
        />
    );

    return (
        <Layout
            style={[styles.container, {paddingTop: safeArea.top}]}
            level='2'>
            <TopNavigation
                alignment='center'
                title='Settings'
                leftControl={renderBackAction()}
            />
            <Layout style={styles.photoSection}>
                <ProfileAvatar
                    style={styles.photo}
                    source={{uri: profile.img}}
                    editButton={renderPhotoButton}
                />
                <View style={styles.nameSection}>
                    <ProfileSetting
                        style={styles.setting}
                        name={0}
                        value={profile.firstname}
                    />
                    <ProfileSetting
                        name={1}
                        style={styles.setting}
                        value={profile.lastname}

                    />
                </View>
            </Layout>
            <Text
                style={styles.description}
                appearance='hint'>
                {profile.bio}
            </Text>
            <ProfileSetting
                style={[styles.setting, styles.emailSetting]}
                hint='Email'
                value={profile.email}
            />
            <ProfileSetting
                style={styles.setting}
                hint='Ville'
                value={profile.city}
            />
            <ProfileSetting
                style={styles.setting}
                hint='Téléphone'
                value={`${profile.phone}`}
            />
            <ProfileSetting
                style={styles.setting}
                hint='Siret'
                value={`${profile.siret}`}
            />
            <Button
                style={styles.doneButton}
                onPress={onDoneButtonPress}>
                DONE
            </Button>
        </Layout>
    );
};

