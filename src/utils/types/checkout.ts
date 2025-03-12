import { ITalent } from './cart';

export type ICheckout = {
  id: string;
  clientId: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  items: ICheckoutItem[];
  clientUser: {
    email: string;
    clientProfile: IClientProfile;
  };
};

export interface ICheckoutItem {
  id: string;
  checkoutId: string;
  talentId: string;
  createdAt: string;
  updatedAt: string;
  talent: ITalent;
}

export interface IClientProfile {
  clientName: string;
  companyName: string;
  phone: string;
}
