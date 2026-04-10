'use client'
import { Product } from "@/src/generated/prisma/client";
import { useStore } from "@/src/store";

 // Indica que este componente es del lado del cliente

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product} : AddProductButtonProps) {
    const addToCart = useStore((state) => state.addToCart)
    return ( 
        <button
                className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-5 p-3 uppercase
                font-bold cursor-pointer"
                onClick={() => addToCart(product)}
        >
        Agregar
        </button>
    );
}

