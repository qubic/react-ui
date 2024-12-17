import React from 'react';
import Header from '../components/ui/layout/Header';

export default {
  title: 'Components/Header',
  component: Header,
};

interface HeaderProps {}

const Template: React.FC<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
