export type Event = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  location: Location | null;
  dateTimeStart: string;
  dateTimeEnd: string;
  registrationUrl: string;
  registrationFee: number;
};

export type Location = {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number | null;
  longitude: number | null;
};

export type Events = Event[];
