export default function Error({ err, id }: { err: string | undefined, id: string | undefined }) {
    if (!err) return null
    return (
        <p
            id={id ? `${id}-error` : undefined}
            className="text-xs text-destructive">
            {err}
        </p>
    )
}
