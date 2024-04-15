export interface Speaker {
  name: {
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  dob: {
    date: string;
    age: number;
  };
  id: {
    name: string;
    value: string;
  };
  phone: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
    medium?: string;
    thumbnail?: string;
  };
  login: {
    uuid: string;
  };
  registered: {
    date: string;
    age: number;
  };
}
