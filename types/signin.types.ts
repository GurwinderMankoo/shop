import { FormState } from "./form.type";

export type SigninFormValues = {
    email: string;
    password: string;
};

export type SigninFormState = FormState<SigninFormValues>;


