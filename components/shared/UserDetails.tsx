type Props = {
    firstName: string
    lastName: string
    email: string
}

export default function UserDetails({ firstName, lastName, email }: Props) {

    return (
        <div className="flex flex-col">
            <span>
                {firstName} {lastName}
            </span>

            <span className="text-xs text-muted-foreground">
                {email}
            </span>
        </div>
    )
}
