"use client"

import { updateProduct } from "@/actions/udate-product-actions";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({children}: {children: React.ReactNode}) { //para que se rendice el componente hijo que es el formulario
    const router = useRouter()
    const params = useParams()
    const id = +params.id

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId"), 
            image: formData.get('image')
        }
        
        const result = ProductSchema.safeParse(data) //validamos los datos con el esquema de zod y safeparse para que no lance error sino que devuelva un objeto con success y error
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        
        const response = await updateProduct(result.data, id)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        toast.success('Producto editado correctamente')
        router.push('/admin/products')
    } 
    return ( 
        <div className="bg-white mt-10 shadow-md px-5 py-10 rounded-md max-w-3xl mx-auto">
            <form className="space-y-5" 
            action={handleSubmit}>

                {children} 
                <input
                type="submit"
                value={"Guardar cambios"}
                className="bg-indigo-600 hover:bg-indigo-800 mt-4 text-white px-4 py-2 w-full cursor-pointer
                font-bold p-3 uppercase" 
                />

            </form>
        </div>
     );
}

 