import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProduct(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive' // Esto hace que la búsqueda no distinga entre mayúsculas y minúsculas
            }
        },
        include: {
            category: true
        }
    })
    return products
}
export default async function SearchPage({searchParams} : {searchParams: {search: string}}) {
    const products = await searchProduct(searchParams.search)
    return ( 
        <>
        <Heading>Resultados de la busqueda: {searchParams.search}</Heading>

        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
            <ProductSearchForm />
        </div>

        {products.length ? (
            <ProductTable 
        products={products}
        />
        ) : <p className="text-center text-lg">No hay resultados</p>}
        
        </>
    );
}

 