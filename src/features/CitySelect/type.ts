import React from 'react';

export interface CitySelectProps {
  cityList: { _id: string; name: string }[];
}

export interface ICitySelectUI {
  children: React.ReactNode;
}
