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
