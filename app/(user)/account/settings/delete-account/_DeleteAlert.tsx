"use client"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



export default function DeleteAlert() {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()


  const onContinue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(false)
    router.push("/account/settings/delete-account")
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md border-red-200 dark:border-red-900 bg-red-50">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-red-600">
            Permanently delete your account?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is <strong>permanent</strong> and cannot be undone.

            <br /><br />

            Deleting your account will permanently remove your profile, orders,
            addresses, and any other associated data.

            <br /><br />

            You'll be asked to confirm your password before deletion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-red-50">
          <AlertDialogCancel
            className="cursor-pointer bg-red-50"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="cursor-pointer"
            type="button"
            onClick={onContinue}
            variant="destructive"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
