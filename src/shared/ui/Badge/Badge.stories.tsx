import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['indigo', 'emerald', 'amber', 'rose', 'sky', 'violet', 'slate'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Pending',
    color: 'amber',
    icon: <Clock className="w-3 h-3" />,
  },
};

export const Success: Story = {
  args: {
    children: 'Delivered',
    color: 'emerald',
    icon: <CheckCircle className="w-3 h-3" />,
  },
};

export const Shipped: Story = {
  args: {
    children: 'In Transit',
    color: 'sky',
    icon: <Truck className="w-3 h-3" />,
  },
};

export const Solid: Story = {
  args: {
    children: 'Ready',
    variant: 'solid',
    color: 'indigo',
    icon: <Package className="w-3 h-3" />,
  },
};
