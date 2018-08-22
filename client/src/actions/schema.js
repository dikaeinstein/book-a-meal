import { schema } from 'normalizr';

// Meal schema
export const mealSchema = new schema.Entity('meals');
export const mealListSchema = new schema.Array(mealSchema);

// Order schema
export const orderSchema = new schema.Entity('orders');
export const orderListSchema = new schema.Array(orderSchema);

// Menu schema
export const menuSchema = new schema.Entity('menu');
