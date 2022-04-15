import * as yup from 'yup';

export const signInValidation = yup.object().shape({
  email: yup.string().email('некорректный email ').required('обязательно к заполнению'),
  password: yup
    .string()
    .min(6, 'минимум 6 символов')
    .max(40, 'максимум 40 символов')
    .required('обязательно к заполнению'),
});

export const signUpValidation = yup.object().shape({
  username: yup
    .string()
    .min(3, 'минимум 3 символа')
    .max(20, 'максимум 20 символов')
    .required('обязательно к заполнению'),
  email: yup.string().email('некорректный email').required('обязательно к заполнению'),
  password: yup
    .string()
    .min(6, 'минимум 6 символов')
    .max(40, 'максимум 40 символов')
    .required('обязательно к заполнению'),
  repeat: yup
    .string()
    .min(6, 'минимум 6 символов')
    .max(40, 'максимум 40 символов')
    .oneOf([yup.ref('password')], 'пароли должны совпадать')
    .required('обязательно к заполнению'),
    checkbox: yup
    .boolean()
    .oneOf([true],'обязательно'),
});

export const editableValidation = yup.object().shape({
  title: yup.string().required('обязательно к заполнению'),
  description: yup.string().required('обязательно к заполнению'),
  text: yup.string().required('обязательно к заполнению'),
});

export const editProfileValidation = yup.object().shape(
  {
    username: yup.string().min(3, 'минимум 3 символа').max(20, 'максимум 20 символов'),
    email: yup.string().email('некорректный email'),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (value) => value?.length,
        then: (rule) => rule.min(6, 'минимум 6 символов').max(40, 'максимум 40 символов'),
      }),
    image: yup
      .string()
      .nullable()
      .notRequired()
      .when('image', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.url('некорректный URL').matches(/\.(jpg|jpeg|png|webp|bmp|avif|gif|svg)$/, 'некорректный URL'),
      }),
  },
  [
    ['password', 'password'],
    ['image', 'image'],
  ]
);
