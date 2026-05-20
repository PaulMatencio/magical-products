import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'glass', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'flat',
    children: (
      <div className="space-y-2">
        <h3 className="font-bold">Standard Card</h3>
        <p className="text-sm text-gray-500">This is a standard flat card for normal UI sections.</p>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    className: 'bg-indigo-500/10',
    children: (
      <div className="space-y-2">
        <h3 className="font-bold">Glassmorphism</h3>
        <p className="text-sm">Premium frosted glass effect for modern dashboards.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="space-y-2">
        <h3 className="font-bold">Elevated Card</h3>
        <p className="text-sm text-gray-500">Includes a soft shadow for prominent elements.</p>
      </div>
    ),
  },
};
