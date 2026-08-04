'use client'

import { Suspense } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import SignIn from "@/app/sign-in/_SignIn";

export default function SignInModal() {
    const router = useRouter();
    const pathname = usePathname();

    // This slot only mounts while the (.)sign-in route is being intercepted,
    // and usePathname() returns "/sign-in" whenever it is. Driving the Dialog
    // with the URL (instead of defaultOpen) makes it reopen reliably on every
    // visit — with defaultOpen the component stays mounted in the client
    // router cache after the first close, so it never re-opens without a full
    // page refresh.
    const isOpen = pathname === "/sign-in";

    const handleClose = (open: boolean) => {
        if (!open) {
            router.back();
        }
    }

    const handleNavigate = (path: string) => {
        // Close the modal first, then navigate to the new route.
        // The dialog is controlled by the URL, so router.back() closes it.
        router.back();
        setTimeout(() => {
            router.push(path);
        }, 100);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[420px] p-0 border-none bg-transparent shadow-none">
                {/* Visually hidden for screen readers to keep shadcn dialog accessible */}

                <DialogTitle className="sr-only">Sign In</DialogTitle>
                <DialogDescription className="sr-only">
                    Sign in to your account via this overlay.
                </DialogDescription>

                <div className="flex items-center justify-center">
                    <Suspense fallback={null}>
                        <SignIn onNavigate={handleNavigate} />
                    </Suspense>
                </div>
            </DialogContent>
        </Dialog>
    )
}
