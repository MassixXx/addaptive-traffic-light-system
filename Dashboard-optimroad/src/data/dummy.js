import React from 'react';
import { AiFillGooglePlusSquare, AiFillCamera } from 'react-icons/ai';
import { FiShoppingBag, FiCreditCard } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';

export const links = [
  {
    title: '',
    links: [
      {
        name: 'utilities',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'recordings',
        icon: <AiFillCamera />,
      },
      {
        name: 'map',
        icon: <AiFillGooglePlusSquare />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

