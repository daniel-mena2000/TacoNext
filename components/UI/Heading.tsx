type HeadingProps = {
    title: string;
    description?: string;
};

export default function Heading({title, description}: HeadingProps) {

    return (
             <div className="mx-auto mt-8 max-w-4xl px-6 text-center">

                <span className="rounded-full bg-emerald-100 px-4 py-2 mb-3 text-sm font-bold uppercase tracking-widest text-emerald-700">
                    🌮 TacoNext
                </span>

                <div>

                <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">
                    {title}
                </h1>

                </div>


                {description && (
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                    {description}

                </p>
                   )}

            </div>

    );
}
