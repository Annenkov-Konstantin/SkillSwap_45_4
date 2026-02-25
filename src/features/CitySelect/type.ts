import React from 'react';

export interface CitySelectProps {
  cityList: { _id: string; name: string }[];
  value?: string | null;
  onChange?: (city: string | null) => void;
  placeholder:string;
}

export interface ICitySelectUI {
  children: React.ReactNode;
}
