import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'


type Props = {
    image: string | null | undefined
    initials: string
    firstName: string
}

export default function UserAvatar({ image, initials, firstName }: Props) {
    return (
        <Avatar>
            <AvatarImage
                src={image || ""}
                alt={firstName || initials || 'User'}
            />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
