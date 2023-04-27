import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'компоненты/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {
  points: [{ _id: 'Плахотного, 9', address: 'sjsj' }],
};
