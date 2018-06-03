const Yup = require('yup');

const userSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(3, 'Full Name cannot be less than 6 characters')
  //   .max(30, 'Full Name cannot be greater than 30 characters')
  //   .required('Full Name is required!'),
  email: Yup.string().email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password cannot be less than 6 characters')
    .max(30, 'Password cannot be greater than 30 characters')
    .required('Password is required'),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Please confirm your password'),
  // role: Yup.string().matches(/^(customer|caterer)$/)
  //   .required('User role is required'),
});

export default userSchema;
