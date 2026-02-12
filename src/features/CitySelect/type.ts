import React from 'react';

export interface CitySelectProps {
  someList: { _id: string; name: string }[];
}

export interface ICitySelectUI {
  children: React.ReactNode;
}
