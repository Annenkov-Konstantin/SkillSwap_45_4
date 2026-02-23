import type { TCity } from "@/entities/city";

export interface IResetCityButtonProps {
  city: TCity;
  onCityToggle: () => void;
}
