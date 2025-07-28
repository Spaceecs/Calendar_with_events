import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userProps } from "@/entities";
import { getAuth } from "firebase/auth";

type UserState = {
    user: userProps | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk<userProps, void>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            const firebaseUser = auth.currentUser;

            if (!firebaseUser) {
                return rejectWithValue('No authenticated user found.');
            }

            const userData: userProps = {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
            };

            return userData;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to fetch user from Firebase');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userProps>) {
            state.user = action.payload;
            state.error = null;
        },
        logoutUser(state) {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<userProps>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.user = null;
            });
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
