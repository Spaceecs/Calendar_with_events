'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../model/RegisterSchema';
import { register } from '../api/register';
import { useRouter } from 'next/navigation';
import { Button, Label } from '@/shared';

export function RegisterForm() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center flex-col max-w-sm mx-auto mt-10 p-6 border rounded shadow">
            <Label>Register</Label>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={registerSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await register({
                            email: values.username,
                            password: values.password,
                        });

                        router.push('/');
                    } catch (error: any) {
                        setErrors({
                            username: error.message || 'Registration failed',
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 w-full">
                        <div>
                            <label htmlFor="username">Username</label>
                            <Field
                                name="username"
                                type="text"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="username"
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

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Please wait...' : 'Register'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="flex flex-col mt-4 justify-center items-center py-4">
                <p className="text-sm pb-2">Already have an account?</p>
                <Button onClick={() => router.push('/auth/login')}>
                    Login
                </Button>
            </div>
        </div>
    );
}
