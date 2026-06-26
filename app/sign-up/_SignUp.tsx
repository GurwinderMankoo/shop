"use client"

import { useActionState } from 'react'

import { signup } from '../actions/signup.actions';
import { SignInUpCard } from '@/components/shared/SignInUpCard';

import { SignupFormState } from '@/types/signup.type';

const initialState: SignupFormState = {
    errors: {},
    success: false,
};

export default function SignUp() {
    const [state, formAction, pending] = useActionState(signup, initialState);

    return (
        <SignInUpCard type='sign-up' action={formAction} state={state} />
    )
}
