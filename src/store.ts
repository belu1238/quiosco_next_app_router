import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from './generated/prisma/client';

interface Store {
    order: OrderItem[]
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        // lógica para agregar al carrito
        const{...data} = product // desestructuro para no pasar categoryId e image al order
        let order: OrderItem[] = []

        if(get().order.find(item => item.id === product.id)) { // verifico si el producto ya esta en el carrito
            order = get().order.map(item => item.id === product.id ? { // ver cual es el producto que quiero actualizar
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)  // incremento la cantidad primero 
            } : item)  
        } else {
            order = [...get().order, {
                ...data, // tomo una copia de data
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        
        set(() => ({  // si quiero escribir en orden le paso el state
            order 
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? { 
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)  
            } : item)  
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id) // traete todos los que sean diferentes
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))