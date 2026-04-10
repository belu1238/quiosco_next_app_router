'use client'
import { useStore } from "@/src/store";
import ProductDetaills from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { CreateOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
    const order = useStore((state) => state.order)  // entro al state y saco order
    const clearOrder = useStore((state) => state.clearOrder) 
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price) , 0), [order]) // cada vez que cambie order queremos volver a calcular el total

    const handleCreateOrder = async (formData : FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        console.log(result)
        if(!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        const response = await CreateOrder(data)

        if(response?.errors){
            response.errors.forEach((issue) => {
                toast.error(issue.message)
        })
        }

        toast.success('Pedido realizado correctamente')
        clearOrder()
    }
    return ( 
        <div className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl font-black text-center mb-5">Mi Pedido</h1>

            {order.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> : (
                <div>
                    {order.map(item => (
                        <ProductDetaills
                            key={item.id}
                            item={item} // le paso el item como prop para que lo renderice
                        />
                    ))}
                <p className="text-2xl mt-20 text-center">
                    Total a pagar: {''}
                    <span className="font-bold">{formatCurrency(total)}</span>
                </p>

                <form
                className="w-full mt-10 space-y-5"
                action={handleCreateOrder}
                >
                    <input
                    type="text"
                    placeholder="Tu Nombre"
                    className="bg-white border border-gray-200 w-full p-2 rounded" 
                    name="name"
                    />

                    <input
                     type="submit"
                     className="py-2 rounded-lg uppercase text-white bg-black hover:bg-slate-900 w-full text-center
                     font-bold cursor-pointer"
                     value={'Confirmar pedido'}
                    />

                </form>
                </div>


            )}
        </div>
     );
}

 