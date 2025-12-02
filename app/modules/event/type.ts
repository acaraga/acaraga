export type Event = {
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  location: string;
  categorySlug: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  registrationUrl: string;
  registrationFee: number;
};

export type Events = Event[];
