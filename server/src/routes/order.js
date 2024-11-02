import { confirmOrder, createOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/order/order.js"
import { verifyToken } from "../middleware/auth.js"

export const orderRoutes = async (fastify, options) => {
    fastify.addHook("preHandler", async (req, reply) => {
        const isAuthenticated = await verifyToken(req, reply)

        if (!isAuthenticated) {
            return reply.status(401).send({
                message: "Not authorized."
            });
        }
    });

    fastify.post("/order", createOrder);
    fastify.get("/order", getOrders);
    fastify.patch("/order/:orderId/status", updateOrderStatus);
    fastify.post("/order/:orderId/confirm", confirmOrder);
    fastify.post("/order/:orderId", getOrderById);
}