export default function SitePage({
    params,
}: {
    params?: any;
    children?: React.ReactNode;
}) {
    return <h1>
        SitePage: {params.id}
    </h1>
}