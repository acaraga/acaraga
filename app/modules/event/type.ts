export type Event = {
  joinedUsers: any;
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  registrationUrl: string;
  registrationFee: number;

  category: Category | null;
  location: Location | null;
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

export type Category = {
  id: string;
  slug: string;
  name: string;
};

export type Events = Event[];
