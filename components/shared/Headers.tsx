import Breadcrumb from "./Breadcrumb"


type HeaderProps = {
    title: string,
    description: string
}

export default function Headers({ title, description }: HeaderProps) {



    return (
        <div className="mb-12">
            <Breadcrumb />

            <h1 className="mt-3 text-4xl font-bold">
                {title}
            </h1>

            <p className="mt-3 max-w-3xl text-muted-foreground">
                {description}
            </p>
        </div>
    )
}
