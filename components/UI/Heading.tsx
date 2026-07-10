type HeadingProps = {
    title: string;
    description?: string;
};

export default function Heading({title, description,}: HeadingProps) {
    
    return (
        <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800">
                {title}
            </h1>

            {description && (
                <p className="mt-2 text-lg text-gray-500">
                    {description}
                </p>
            )}
        </div>
    );
}
