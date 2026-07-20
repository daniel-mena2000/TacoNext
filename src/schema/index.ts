import {z} from 'zod'

//Nuestro schema de prisma como campos obligatorios son: name, orderProducts y total

//"El campo name debe ser un string y debe tener al menos 1 carácter."
export const OrderSchema = z.object({
    name: z.string().min(1, 'Tu nombre es Obligatorio'),
    total: z.number().min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))

})

//Este schema se usa para tranformar  el ID de actualizacion a completada de la order y sea numero
export const OrderIdSchema = z.object({
    orderId: z.string().transform((value) => parseInt(value)).refine(value => value > 0, {message: 'No hay coincidencias'})
})

//Schema para validar el input de busqueda
export const SearchSchema = z.object({
    search: z.string().trim().min(1, {message: 'La busqueda no puede ir vacia'})
})

//Schema para formulario de AddProductForm
export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, {message: 'Agregar una imagen del producto'})
})
