/** API에 사용될 스키마 타입
  * frize 타입스키마는 노션에 정리가 되어있으며,
  */

import { FrigeType } from "../frige";

export interface FrizeUser {
  frizeName: string;
  frizeCate?: string | undefined;
}
export interface FrizeOnlyId {
  frizeId: string;
  frizeCate?: string | undefined;
}
export interface FrizeIngreModify extends FrizeOnlyId {
  ingredientDelete?: string[];
  ingredientAdd: FrigeType[];
}
export interface IngredientModify {
  frizeId: string;
  ingredientId: string;
  frizeModifyData: object;
}
export interface IngredientBeModifyed {
  updatedDate?: string;
  expirationDate?: string;
  memo?: string;
}

