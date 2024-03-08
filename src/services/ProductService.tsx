/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

const PRODUCT_BASE_REST_API_URL = "http://localhost:8080/api/v1/products"

class ProductService {
    getAllProducts(){
        return axios.get(PRODUCT_BASE_REST_API_URL)
    }

    createProduct(product: any){
        return axios.post(PRODUCT_BASE_REST_API_URL, product)
    }

    getProductById(id: string){
        return axios.get(PRODUCT_BASE_REST_API_URL + "/" + id)
    }

    updateProduct(id: string, product: any){
        return axios.put(PRODUCT_BASE_REST_API_URL + "/" + id, product)
    }

    deleteProduct(id: string) {
        return axios.delete(PRODUCT_BASE_REST_API_URL + "/" + id)
    }
}

export default new ProductService();
