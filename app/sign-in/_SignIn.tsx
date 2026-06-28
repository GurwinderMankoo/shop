"use client"

import { useActionState, useEffect } from 'react'

import { signin } from '../actions/signin.action';
import { SignInUpCard } from '@/components/shared/SignInUpCard';

import { SigninFormState } from '@/types/signin.types';
import { useSearchParams, useRouter } from 'next/navigation';

const initialState: SigninFormState = {
    errors: {},
    success: false,
};

export default function SignIn({ onNavigate }: { onNavigate?: (path: string) => void }) {
    const [state, formAction, pending] = useActionState(signin, initialState);
    const { success } = state
    const searchParams = useSearchParams();
    const callback = searchParams.get('callbackUrl');
    const router = useRouter();

    useEffect(() => {
        if (success && callback) {
            if (typeof onNavigate === 'function') {
                onNavigate?.(callback);
            } else {
                router.push(callback);
            }
        }
    }, [success, callback, router])

    return (
        <SignInUpCard type='sign-in' action={formAction} state={state} onNavigate={onNavigate} />
    )
}
