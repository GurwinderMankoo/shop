import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type Props = {
    loadingText?: string;
    text: string
}

export default function SubmitButton({ loadingText = "loading...", text }: Props) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="h-11 w-full"
            disabled={pending}
        >
            {pending
                ? loadingText
                : text
            }
        </Button>
    )
}
