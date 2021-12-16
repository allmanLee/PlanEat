export interface IngredientType {
  name: string;
  engName?: string;
}
export interface FrigeType extends IngredientType {
  updatedDate?: string;
  expirationDate?: string;
  memo?: string;
  amount?: "충분" | "보통" | "소량";
  id: string;  //영문이름+날짜 (apple20210802)
}
export interface FrigeCate {
  frizeName: string;
  frizeId: string;
}
