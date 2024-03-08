import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Input from "../../components/inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import TextArea from "../../components/inputs/TextArea";
import CustomCheckbox from "../../components/inputs/CustomCheckbox";
import { categories } from "../../utils/categories";
import CategoryInput from "../../components/inputs/CategoryInput";
import Button from "../../components/buttons/Button";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import { FaPlusCircle } from "react-icons/fa";
import Select from "../../components/inputs/Select";

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, setValue, watch, formState: { errors }, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
            price: ""
        }
    });

    const category = watch('category');

    const options = [
        { label: "Samsung", value: "Samsung" },
        { label: "Apple", value: "Apple" },
        { label: "Huawei", value: "Huawei" },
        // Add more brands as needed
    ];

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true            
        });
        console.log("id: ", id, " value: ", value)
    };

    const {id} = useParams();

    useEffect(() => {
        if (id) {            
            ProductService.getProductById(id)
                .then((response) => {
                    const productData = response.data;                    
                    setValue("productName", productData.productName);
                    setValue("description", productData.description);
                    setValue("brand", productData.brand);
                    setValue("category", productData.category);
                    setValue("price", productData.price);
                    setValue("inStock", productData.inStock);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id, setValue]);    

    const title = () => {
        if(id){
            return "Actualizar Producto"
        } else {
            return "Agregar Producto"
        }
    }

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);

        if(id){
            try {
                const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción actualizará el producto.',
                    icon: 'info',
                    showCancelButton: true,
                    color: 'black',
                    confirmButtonText: 'Sí, actualizar',
                    confirmButtonColor: '#4FC3F7',      
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#FE001B',
                    customClass: {
                    container: 'custom-alert-container'
                    },
                });
    
                if (result.isConfirmed){
                    ProductService.updateProduct(id, data).then(response => {
                        toast.success("Producto Actualizado");
                    })
                    .catch(error => {
                        toast.error("Error al actualizar el producto");
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                }
                
            } catch (error) {
                Swal.fire('Error', 'Ha ocurrido un error al actualizar el producto.', 'error');
            }
        } else {
            try {
                const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción creará un nuevo producto.',
                    icon: 'info',
                    showCancelButton: true,
                    color: 'black',
                    confirmButtonText: 'Sí, crear',
                    confirmButtonColor: '#4FC3F7',      
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#FE001B',
                    customClass: {
                    container: 'custom-alert-container'
                    },
                });

                if (result.isConfirmed){
                    ProductService.createProduct(data).then(response => {
                        toast.success("Producto Agregado");
                    })
                    .catch(error => {
                        toast.error("Error al agregar el producto");
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                }                
            } catch (error) {
                Swal.fire('Error', 'Ha ocurrido un error al crear el producto.', 'error');
                
            }
        }
    };    

    return (
        <>
            <div className="container">
            </div>
            <Heading title={title()} center/>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                <Input
                    id="productName"
                    label="Nombre"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="price"
                    label="Precio"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="flex items-center">

                    <Select
                        id="brand" // Corrected field name
                        label="Marca"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        options={options} // Passing options to Select component
                        required
                    />

                    {/* <Input
                        id="brand"
                        label="Marca"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required                        
                    /> */}
                    <FaPlusCircle className="ml-2" size={28} title="Ingresar nueva marca"/>
                </div>
                <TextArea
                    id="description"
                    label="Descripción"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <CustomCheckbox 
                    id="inStock"
                    register={register}
                    label="Este producto se encuentra en stock"
                />
                <div className="w-full font-medium space-y-2">
                    <div className="mb-2 font-semibold">Seleccione una Categoría</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                        {categories.map((item) => {
                            if(item.label === 'All') {
                                return null;
                            }
                            return <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category', category)}
                                    selected={category === item.label}
                                    label = {item.label}
                                    icon = {item.icon}
                                />
                            </div>
                        })}
                    </div>
                </div>
                {/* <div>
                    <div className="mb-2 font-semibold">Seleccione una Imagen</div>
                    <FileUpload
                        id="image"
                        label="Selecciona una imagen"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div> */}
                

                <Button 
                    label={title()}
                    outline
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </>
    );
};

export default AddProductForm;
