import * as Yup from 'yup';

export const registerSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^[A-Za-z0-9]+$/,
            'Password must contain only Latin letters and digits, no special characters'
        )
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Password confirmation is required'),
});
