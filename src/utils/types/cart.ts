export type ITalent = {
  id: string;
  firstName: string;
  secondName: string;
  skills: string[];
  mainTitle: string;
  yearsOfExperience: number;
  profileImage: string;
};

export type ICartItem = {
  id: string;
  cartId: string;
  talentId: string;
  talentSnapshot: {
    name: string;
    mainTitle: string;
    skills: string[];
    yearsOfExperience: number;
  };
  createdAt: string;
  updatedAt: string;
  talent: ITalent;
  cart: ICart;
};

export type ICart = {
  id: string;
  name: string;
  status: string;
  clientId: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
};
