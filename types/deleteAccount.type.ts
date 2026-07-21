
import { FormState } from "./form.type"


export type DeleteAccountFormValues = {
    password: string
    confirmationText: string
}

export type DeleteAccountFormState = FormState<DeleteAccountFormValues>