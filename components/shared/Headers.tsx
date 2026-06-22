import Breadcrumb from "./Breadcrumb"


type HeaderProps = {
    title?: string,
    description?: string
    name?: string
}

export default function Headers({ title, description, name }: HeaderProps) {



    return (
        <div className="mb-12">
            <Breadcrumb name={name} />

            {title && <h1 className="mt-3 text-4xl font-bold">
                {title}
            </h1>}

            {description && <p className="mt-3 max-w-3xl text-muted-foreground">
                {description}
            </p>}
        </div>
    )
}
