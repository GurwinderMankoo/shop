import { FormState } from "./form.type";

export type SignupFormValues = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type SignupFormState = FormState<SignupFormValues>;