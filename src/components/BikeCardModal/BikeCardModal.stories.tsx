import React from 'react';
import bikeDefaultImg from '../../img/b3.png';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BikeCardModal } from './BikeCardModal';

export default {
  title: 'компоненты/модальные окна',
  component: BikeCardModal,
} as ComponentMeta<typeof BikeCardModal>;

const Template: ComponentStory<typeof BikeCardModal> = (args) => <BikeCardModal {...args} />;

export const BikeModalDefault = Template.bind({});
BikeModalDefault.args = {
  onClose: () => {
    /*console.log('Hello')*/
  },
  bike: { _id: '', name: 'Stels XT280 V010', cost: 320, img: bikeDefaultImg },
};
