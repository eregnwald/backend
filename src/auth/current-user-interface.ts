export interface CurrentUser {
  userId: number;
  email: string;
  roles: string[];
  [key: string]: any; // если есть дополнительные поля
}