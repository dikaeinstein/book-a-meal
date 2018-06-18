const Yup = require('yup');

const userSchema = Yup.object().shape({
  email: Yup.string().email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password cannot be less than 6 characters')
    .max(30, 'Password cannot be greater than 30 characters')
    .required('Password is required'),
});

export default userSchema;
