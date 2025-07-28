import {auth, nextApi} from '@/shared';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type RegisterData = {
    email: string;
    password: string;
};

export async function register({ email, password }: RegisterData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await nextApi.post('/auth', { idToken }, { withCredentials: true });
}
