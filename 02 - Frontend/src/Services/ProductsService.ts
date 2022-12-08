import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { addProductAction, deleteProductAction, fetchProductsAction, updateProductAction } from "../Redux/ProductsState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class ProductsService {

    public async fetchProducts(): Promise<ProductModel[]> {
        if(store.getState().productsState.products.length === 0) {
            const response = await axios.get<ProductModel[]>("http://localhost:3001/api/products/");
            const products = response.data;
            store.dispatch(fetchProductsAction(products));
        }
        return store.getState().productsState.products;
    }

    public async getOneProduct(id: number): Promise<ProductModel> {
        let product = store.getState().productsState.products.find(p => p.id === id);
        if(!product) {
            const response = await axios.get<ProductModel>(config.taskUrl + id);
            product = response.data;
        }
        return product;
    }

    public async deleteOneProduct(id: number): Promise<void> {
        await axios.delete("http://localhost:3001/api/products/" + id);
        store.dispatch(deleteProductAction(id));
    }

    public async addNewProduct(product: ProductModel): Promise<ProductModel> {

        // Convert out product to FormData:
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("image", product.image.item(0));
        console.log("form data of products in products service: " , formData);
        
        // Post the new product to the server: 
        const response = await axios.post<ProductModel>("http://localhost:3001/api/products/", formData);
        const addedProduct = response.data;

        // Add to redux global state: 
        store.dispatch(addProductAction(addedProduct));

        return addedProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        // Convert out product to FormData:
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("image", product.image.item(0));

        // Put the new product to the server: 
        const response = await axios.put<ProductModel>("http://localhost:3001/api/products/" + product.id, formData);
        const updatedProduct = response.data;

        // Add to redux global state: 
        store.dispatch(updateProductAction(updatedProduct));

        return updatedProduct;
    }
    
}

const productsService = new ProductsService();

export default productsService;