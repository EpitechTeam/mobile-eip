import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person-outline'/>
);

export const ClockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='pin-outline'/>
);

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='navigation-2-outline'/>
);


export const CloseIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='close'/>
);

export const SearchIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='search'/>
);


export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='plus'/>
);

export const ShareIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='share-outline'/>
);
