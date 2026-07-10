import Image from "next/image";

export default function Logo() {
    return(
        <div className="flex justify-center mt-5">
                  <Image
                        src="/logo.png"
                        alt="Logo TacoNext"
                        width={250}
                        height={80}
                        priority
                        className="mx-auto mb-10"
                    />
        </div>
    )
}
