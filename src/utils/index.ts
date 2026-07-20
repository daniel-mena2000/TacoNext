export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)

}

//Funcion para resolver si una imagen viene de public o de cloudinary, y poder mostrarla dependiendo de donde este alamacenada
export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'

    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }
}
