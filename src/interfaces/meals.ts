export interface MealDTO {
  id: string;
  name: string;
  description: string;
  date: string;
  is_diet: boolean;
  created_at: string;
}

export interface InsertMealDTO {
  id: string;
  name: string;
  description: string;
  date: Date;
  is_diet: boolean;
  user_id: string;
}
