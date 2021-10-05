import { Story, Meta } from '@storybook/react';
import { Todos, TodosProps } from './todos';

export default {
  component: Todos,
  title: 'Todos',
} as Meta;

const Template: Story<TodosProps> = (args) => <Todos {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
