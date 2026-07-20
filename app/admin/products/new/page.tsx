import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/UI/Heading"
import GoBackButton from "@/components/UI/GoBackButton"

export default function CreateProductPage() {
    return(
        <>
    <Heading
        title="➕ Nuevo producto"
        description="Registra un nuevo producto y asígnalo a una categoría."
    />

        <GoBackButton/>

        <AddProductForm>
            <ProductForm />
        </AddProductForm>


      </>
    )
}
