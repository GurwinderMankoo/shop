export default function Error({ err, id }: { err: string | undefined, id: string }) {
    if (!err) return null
    return (
        <p
            id={`${id}-error`} className="text-xs text-destructive">
            {err}
        </p>
    )
}
