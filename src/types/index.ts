import { Order, OrderProducts, Product } from "../generated/prisma/client";


export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
} 

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[] // porque orderProducts es un array, entonces cada elemento del array es un objeto que tiene las propiedades de OrderProducts y una propiedad product que a su vez es un objeto con las propiedades de Product
}

