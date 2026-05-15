export type ApiPlace = {
  display_name: string;
  lat: string;
  lon: string;
};

export type Place = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
};

export type ChecklistItem = {
  id: number;
  text: string;
  done: boolean;
};

export type ChecklistProps = {
  items: ChecklistItem[];
  setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
};

export type TripDetailsProps = {
  flight: string;
  setFlight: (v: string) => void;
  hotel: string;
  setHotel: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
};

export type Trip = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  places: Place[];
  items: ChecklistItem[];
  flight: string;
  hotelName: string;
  hotelAddress: string;
  coverImage: string;
};
