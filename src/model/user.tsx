export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Company {
  name: string;
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  // info detail
  age: number;
  company: Company;
  address: Address;
  phone: string;
}