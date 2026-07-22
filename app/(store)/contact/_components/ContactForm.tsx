"use client";

import { useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = {
    success: false,
    errors: {},
    values: { name: "", email: "", subject: "", message: "" },
};

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(submitContact, initialState);

    useEffect(() => {
        if (state?.success === false && state?.errors?.message?.[0]?.includes("Something went wrong")) {
            toast.error("Something went wrong. Please try again later.");
        }
    }, [state]);

    if (state.success) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-10 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        defaultValue={state.values?.name}
                        aria-invalid={!!state.errors?.name}
                    />
                    {state.errors?.name && (
                        <p className="text-xs text-destructive">{state.errors.name[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        defaultValue={state.values?.email}
                        aria-invalid={!!state.errors?.email}
                    />
                    {state.errors?.email && (
                        <p className="text-xs text-destructive">{state.errors.email[0]}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    defaultValue={state.values?.subject}
                    aria-invalid={!!state.errors?.subject}
                />
                {state.errors?.subject && (
                    <p className="text-xs text-destructive">{state.errors.subject[0]}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    defaultValue={state.values?.message}
                    aria-invalid={!!state.errors?.message}
                    className="resize-none"
                />
                {state.errors?.message && (
                    <p className="text-xs text-destructive">{state.errors.message[0]}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={pending}
                className="h-11 w-full sm:w-auto"
            >
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                    </>
                )}
            </Button>
        </form>
    );
}
