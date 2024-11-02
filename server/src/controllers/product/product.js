import { Product } from "../../models/index.js";

export const getProductByCategoryId = async (req, reply) => {
    try {
        const {categoryId} = req.params;
        
        const products = await Product.find({category: categoryId})
            .select("-category")
            .exec();
        
        return reply.send(products);

    }catch(error) {
        return reply.status(500).send({
            message: `An error occured with fetching products ${error}`
        })
    }
}