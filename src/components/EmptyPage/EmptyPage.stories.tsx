import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EmptyPage } from './EmptyPage';

export default {
  title: 'компоненты/empty',
  component: EmptyPage,
} as ComponentMeta<typeof EmptyPage>;

const Template: ComponentStory<typeof EmptyPage> = (args) => <EmptyPage {...args} />;

export const ButtonDefault = Template.bind({});
