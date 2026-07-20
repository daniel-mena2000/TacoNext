"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { getImagePath } from "@/src/utils";


export default function ImageUpload({image}: {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState("");


    return (
        <CldUploadWidget
        uploadPreset="u1pfs1kr"
        options={{
            maxFiles: 1,
        }}

            onSuccess={(result, { widget }) => {
                if (result.event === "success" && typeof result.info === "object" && result.info !== null &&"secure_url" in result.info) {

                    widget.close();
                    setImageUrl(result.info.secure_url);
                }
            }}
        >
            {({ open }) => (
                <div className="space-y-3">
                    <label
                        htmlFor="image"
                        className="block text-sm font-bold uppercase tracking-wider text-gray-600"
                    >
                        Imagen del producto
                    </label>

                    <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 transition-all hover:border-emerald-500">

                        {/* Vista previa de la imagen que seleccionamos, si no hemos selecionado una imagen mostramos la otra vista */}
                        {imageUrl ? (
                            <>
                                <div className="relative h-80 w-full">
                                    <Image
                                        src={imageUrl}
                                        alt="Imagen del producto"
                                        fill
                                        className="object-contain p-6"
                                    />
                                </div>

                                <div className="absolute right-5 top-5">
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="rounded-xl bg-black/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black cursor-pointer"
                                    >
                                        Cambiar imagen
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-80 flex-col items-center justify-center px-8 text-center">

                                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                                    <ImagePlus
                                        size={40}
                                        className="text-emerald-600"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800">
                                    Agregar imagen
                                </h3>

                                <p className="mt-2 max-w-sm text-gray-500">
                                    Sube una fotografía atractiva del producto.
                                    Una buena imagen ayuda a captar la atención de los clientes.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="mt-8 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700 active:scale-95 cursor-pointer"
                                >
                                    📷 Seleccionar imagen
                                </button>
                            </div>
                        )}
                          {image && !imageUrl && (
                        <div className="space-y-2 flex flex-col items-center border-t-2 border-dashed border-emerald-300">
                            <label className="text-2xl font-bold text-gray-800 py-2">Imagen actual</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen producto"
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}
                    </div>


                    <input type="hidden" name="image" value={imageUrl ? imageUrl: image}/>
                </div>
            )}
        </CldUploadWidget>
    );
}
