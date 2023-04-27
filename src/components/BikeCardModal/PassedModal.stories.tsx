import React from 'react';
import bikeDefaultImg from '../../img/b3.png';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PassedModal } from './PassedModal';

export default {
  title: 'компоненты/модалка после аренды',
  component: PassedModal,
} as ComponentMeta<typeof PassedModal>;

const Template: ComponentStory<typeof PassedModal> = (args) => <PassedModal {...args} />;

export const PassedModalDefault = Template.bind({});
PassedModalDefault.args = {
  onClose: () => {
    /*console.log('Hello')*/
  },
  bike: { _id: '', name: 'Stels XT280 V010', cost: 320, img: bikeDefaultImg },
};
