import React from 'react';
import bikeDefaultImg from '../../img/b3.png';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RentedModal } from './RentedModal';

export default {
  title: 'компоненты/модалка аренды',
  component: RentedModal,
} as ComponentMeta<typeof RentedModal>;

const Template: ComponentStory<typeof RentedModal> = (args) => <RentedModal {...args} />;

export const RentedModalDefault = Template.bind({});
RentedModalDefault.args = {
  onClose: () => {
    return null;
  },
  bike: { _id: '', name: 'Stels XT280 V010', cost: 320, img: bikeDefaultImg },
  onPass: () => {
    return null;
  },
};
