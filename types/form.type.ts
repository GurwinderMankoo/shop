import { User } from "@prisma/client";

export type FormErrors<T> = Partial<Record<keyof T, string[]>>;

export type FormState<T> = {
    success: boolean;
    errors: FormErrors<T>;
    values?: Partial<T>;
    user?: Partial<User>
};