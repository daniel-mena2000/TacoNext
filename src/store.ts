import {create} from 'zustand'
import { OrderItem } from './types'
import { Product } from './generated/prisma/client'


interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],

    addToOrder: (product) => {
//No necesitamos categoryId, ni image,  creamos un objeto nuevo objeto con el resto de atributos de product y al agregar al state, le agreamos los atributos que faltan "quantity" y "subtotal" ya que esos no estan el el type de Product de prismaClient
        const {categoryId, image, ...data} = product
//funciona como una variable temporal donde vas almacenando el nuevo estado del carrito según la condición que se cumpla.Es como decir: "Primero construyo cómo debe quedar el carrito y después actualizo el estado una sola vez."
        let orderItem: OrderItem[] = []
//Aquí get() se utiliza porque necesitas consultar el estado actual de order antes de decidir qué hacer.
//Lo que está preguntando es:"¿Ya existe en el carrito un producto con este mismo id?"
    const order = get().order
    const productExists = order.find(item => item.id === product.id)
//Si el producto ya existe auemntamos cantidad y multiplicamos subtotal
        if (productExists) {

             orderItem = order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item)
        } else {
            orderItem = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set({
            order: orderItem
        })

    },

    increaseQuantity: (id) => {
      set((state) => ({
          order:  state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item)
      }))
 },

 decreaseQuantity: (id) => {
//El descrementar llevara mas logica ya que si ya tenemos 1, no podemos descrementar menos de eso
    const order = get().order.map(item => item.id == id ? {
        ...item,
        quantity: item.quantity - 1,
        subtotal: item.price * (item.quantity - 1)
    } : item)

    set({
        order
    })
 },

 removeItem: (id) => {
    set((state) => ({
        order: state.order.filter(item => item.id !== id)
    }))
 },

 clearOrder: () => {
    set(() => ({
        order: []
    }))
 }
}))
