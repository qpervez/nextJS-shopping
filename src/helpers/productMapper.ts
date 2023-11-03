import Product from "../contracts/product";

export default function productMap(products: any[]): Product[] {

    const mappedProducts: Product[] = products.map(product => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating?.rate,
                count: product.rating?.count
            }
        }
    });

    return mappedProducts;

}