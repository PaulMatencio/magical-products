import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Sparkles, Trash2, ArrowRight } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'gradient'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Magical Button',
    leftIcon: <Sparkles className="w-4 h-4" />,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Item',
    leftIcon: <Trash2 className="w-4 h-4" />,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Saving Changes',
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'secondary',
    children: 'Next Step',
    rightIcon: <ArrowRight className="w-4 h-4" />,
  },
};
