import React, {Component} from "react";
import {WebView} from 'react-native-webview';
import {View} from "react-native";

export default class Help extends Component {
    render() {
        return (
            <WebView
                originWhitelist={['*']}
                source={{html: " <body><!-- Start of willallyhelptest Zendesk Widget script -->\n" +
                        "<script id=\"ze-snippet\" src=\"https://static.zdassets.com/ekr/snippet.js?key=9c516fcf-f5b4-43a0-830b-785a05a368ac\"> </script>\n" +
                        "<!-- End of willallyhelptest Zendesk Widget script --></body>"}}
            />
        )
    }
}