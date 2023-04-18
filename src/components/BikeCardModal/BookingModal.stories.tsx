import React from 'react';
import bikeDefaultImg from '../../img/b3.png';
import defaultQR from '../../img/qr.png';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BookingModal } from './BookingModal';

export default {
  title: 'компоненты/модалки бронирования',
  component: BookingModal,
} as ComponentMeta<typeof BookingModal>;

const Template: ComponentStory<typeof BookingModal> = (args) => <BookingModal {...args} />;

export const BookingModalDefault = Template.bind({});
BookingModalDefault.args = {
  bike: { _id: '', name: 'Stels XT280 V010', cost: 320, img: bikeDefaultImg },
  qrCode: defaultQR,
  onClose: () => {
    /*console.log('Hello')*/
  },
};
