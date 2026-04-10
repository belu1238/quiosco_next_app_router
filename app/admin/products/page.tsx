import ProductPagination from "@/app/components/products/ProductPagination";
import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function countProducts() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })

    return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>
export default async function ProductsPage({searchParams} : {searchParams: {page: string}}) {
    const page = +searchParams.page || 1
    const pageSize = 10
    
    if(page < 0) redirect("/admin/products")
        
    const productsData = getProducts(page, pageSize)
    const totalProductsData = countProducts()
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData]) // para que las consultas se ejecuten en paralelo
    const totalPages = Math.ceil(totalProducts / pageSize)

    if(page > totalPages) redirect("/admin/products") 
    
    
    return ( 
        <>
        <Heading>Administra productos</Heading>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link 
            href={'/admin/products/new'}
            className="bg-amber-500 hover:bg-amber-600 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
            Crear Producto</Link>

            <ProductSearchForm />
            
        </div>
        <ProductTable
            products={products}
        />
        <ProductPagination
           page={page} 
           totalPages={totalPages}
        />
        </>
     );
}

 