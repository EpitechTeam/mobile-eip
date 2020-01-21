import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Divider, Layout, LayoutProps, Text} from '@ui-kitten/components';

export interface ProfileSettingProps extends LayoutProps {
    hint?: string;
    name?: number;
    value: string;
}

export const ProfileSetting = (props: ProfileSettingProps): React.ReactElement => {

    const {style, hint, name, value, ...layoutProps} = props;

    const renderHintElement = (): React.ReactElement => (
        <Text
            appearance='hint'
            category='s1'>
            {hint}
        </Text>
    );

    return (
        <React.Fragment>
            <Layout
                {...layoutProps}
                style={[styles.container, style]}>
                {hint && renderHintElement()}
                <TextInput onChangeText={(text) => {
                    if (name == 0)
                        global.firstname = text
                    else if (name == 1)
                        global.lastname = text
                    else {
                        switch (hint) {
                            case "Email":
                                global.email = text
                                break;
                            case "Ville":
                                global.city = text
                                break;
                            case "Téléphone":
                                global.phone = text
                                break;
                            case "Siret":
                                global.siret = text
                                break;
                        }
                    }
                }}>
                    {value}
                </TextInput>
            </Layout>
            <Divider/>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
