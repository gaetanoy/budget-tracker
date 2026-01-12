export type Account = {
  id: number;
  name: string;
  user_id: number;
  bank_id: number;
};




export const createDefaultAccount = (userId: number): Account => ({
  id: 1,
  name: "Sans banque",
  user_id: userId,
  bank_id: 1,
});