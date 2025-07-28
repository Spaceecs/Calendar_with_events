import {auth, nextApi} from '@/shared';
import { signInWithEmailAndPassword } from 'firebase/auth';

type LoginData = {
    email: string;
    password: string;
};

export async function login({ email, password }: LoginData) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await nextApi.post('/auth', { idToken }, { withCredentials: true });
}
