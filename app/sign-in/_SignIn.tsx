"use client"

import { useActionState } from 'react'

import { signin } from '../actions/signin.action';
import { SignInUpCard } from '@/components/shared/SignInUpCard';

import { SigninFormState } from '@/types/signin.types';

const initialState: SigninFormState = {
    errors: {},
    success: false,
};

export default function SignIn({ onNavigate }: { onNavigate?: (path: string) => void }) {
    const [state, formAction, pending] = useActionState(signin, initialState);

    return (
        <SignInUpCard type='sign-in' action={formAction} state={state} onNavigate={onNavigate} />
    )
}
