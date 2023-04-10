import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BikeCard } from './BikeCard';

export default {
  title: 'компоненты/Карточка',
  component: BikeCard,
} as ComponentMeta<typeof BikeCard>;

const Template: ComponentStory<typeof BikeCard> = (args) => <BikeCard {...args} />;

export const BikeCardDefault = Template.bind({});

BikeCardDefault.args = {
  bike: { _id: '', name: 'Stels XT280 V010', cost: 320, img: '../../img/logo.svg' },
};
