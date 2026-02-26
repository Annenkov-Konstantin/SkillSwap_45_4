import React from 'react';

export interface CitySelectProps {
  cityList: { _id: string; name: string }[];
  value?: string;
  onChange?: (city: string) => void;
  placeholder:string;
}

export interface ICitySelectUI {
  children: React.ReactNode;
}

