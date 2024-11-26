import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { getProductID, searchProduct } from "../Controllers/product.controller";
import { getCategory } from "../Controllers/category.controller";
const router = Router();

/* router.get("/products", async (req, res)=>{
  try {
    // Itera sobre el array `products` correctamente
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.nombre,
          price: product.precio,
          imagen: product.urlImagen,
          ram: product.ram,
          storage: product.almacenamiento,
          description: "",
          categoryId: "090ad538-f867-4481-9b34-da62de267d03"
        },
      });
      console.log("Producto creado:", createdProduct);
    }
  } catch (error) {
    console.error("Error al importar productos:", error);
  } finally {
    await prisma.$disconnect();
  }
}); */

router.get("/products/search", authMiddleware, searchProduct);

router.get("/products/category", authMiddleware, getCategory);

router.get("/products", authMiddleware, getProductID)

export default router;
