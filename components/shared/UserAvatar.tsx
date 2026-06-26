import { Avatar, AvatarFallback } from "../ui/avatar"


type Props = {
    initials: string
}

export default function UserAvatar({ initials }: Props) {
    return (
        <Avatar className="cursor-pointer h-8 w-8">
            <AvatarFallback className="w-full">
                {initials}
            </AvatarFallback>
        </Avatar>
    )
}
