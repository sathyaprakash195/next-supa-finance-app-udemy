export interface IUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at: string;
  profile: {
    name: string;
    profile_pic: string;
  };
}

export interface ITransaction {
  id: string;
  user_id: string;
  amount: number;
  notes: string;
  type: string;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}
