const Yup = require('yup');

const mealSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Meal name cannot be less than 3 characters')
    .max(30, 'Meal name cannot be greater than 30 characters')
    .required('Meal name is required'),
  description: Yup.string().required('Meal description is required'),
  price: Yup.number()
    .max(Number.MAX_SAFE_INTEGER)
    .min(0)
    .lessThan(Number.MAX_SAFE_INTEGER, 'Meal price is too large')
    .moreThan(0, 'Meal price cannot be less than 0')
    .positive('Meal price can only be a positive number')
    .required('Meal price is required'),
  imageUrl: Yup.string().url(),
});

export default mealSchema;
