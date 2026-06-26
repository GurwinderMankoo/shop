'use client'

import { useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import SignIn from "@/app/sign-in/_SignIn";

export default function SignInModal() {
    const router = useRouter();
    const isNavigatingRef = useRef(false);

    const handleClose = (open: boolean) => {
        if (!open && !isNavigatingRef.current) {
            router.back();
        }
    }

    const handleNavigate = (path: string) => {
        // Close the modal first, then navigate to the new route
        // Use a ref to prevent handleClose from also calling router.back()
        // when the Dialog fires onOpenChange(false) as it closes
        isNavigatingRef.current = true;
        router.back();
        setTimeout(() => {
            router.push(path);
            isNavigatingRef.current = false;
        }, 100);
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[420px] p-0 border-none bg-transparent shadow-none">
                {/* Visually hidden for screen readers to keep shadcn dialog accessible */}

                <DialogTitle className="sr-only">Sign In</DialogTitle>
                <DialogDescription className="sr-only">
                    Sign in to your account via this overlay.
                </DialogDescription>

                <div className="flex items-center justify-center">
                    <SignIn onNavigate={handleNavigate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
