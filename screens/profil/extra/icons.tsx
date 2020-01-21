import React from 'react';
import { Icon, IconElement, } from '@ui-kitten/components';
import { ImageStyle } from 'react-native';

export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='arrow-ios-back'/>
);

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='settings-2-outline'/>
);

export const PersonAddIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person-add'/>
);

export const PinIcon = (): IconElement => {
  return (
    <Icon
      width={16}
      height={16}
      fill={'#FFFFFF'}
      name='pin'
    />
  );
};
