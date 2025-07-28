'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../model/LoginSchema';
import { login } from '../api/login';
import { useRouter } from 'next/navigation';
import { Button, Label } from '@/shared';

export const LoginForm = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center flex-col max-w-sm mx-auto mt-10 p-6 border rounded shadow">
            <Label>Login</Label>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await login({
                            email: values.email,
                            password: values.password,
                        });

                        router.push('/');
                    } catch (error: any) {
                        setErrors({
                            password: error.message || 'Login failed',
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 w-full">
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Please wait...' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="flex flex-col mt-4 justify-center items-center py-4">
                <p className="text-sm pb-2">Don't have an account yet?</p>
                <Button onClick={() => router.push('/auth/register')}>
                    Register
                </Button>
            </div>
        </div>
    );
};
