import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toggler } from './Toggler';

export default {
  title: 'компоненты/Toggler',
  component: Toggler,
} as ComponentMeta<typeof Toggler>;

const Template: ComponentStory<typeof Toggler> = (args) => <Toggler {...args} />;

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {
  onClick: () => {
    return null;
  },
};
