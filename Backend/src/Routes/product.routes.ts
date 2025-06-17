import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewareAdmin";
import {
  createProduct,
  deleteProduct,
  getProductID,
  getProducts,
  searchProduct,
  updateProduct,
} from "../Controllers/product.controller";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../Controllers/category.controller";
const router = Router();

// import { PrismaClient } from "@prisma/client";
// import  products  from "../Data/moviles.json";
// const prisma = new PrismaClient();

// router.get("/products", async (req, res) => {
//   try {
//     // Itera sobre el array `products` correctamente
//     for (const product of products) {
//       const createdProduct = await prisma.product.create({
//         data: {
//           name: product.nombre,
//           price: product.precio,
//           imagen: product.urlImagen,
//           ram: product.ram,
//           storage: product.almacenamiento,
//           investments: product.investment,
//           description: "",
//           inventoryCount: 25,
//           categoryId: "f52162b3-9165-4dc4-8b09-6c8314cf6cfb",
//           sedeId: "c4a20b23-0ff1-4e9e-b378-627f56d75b38"
//         },
//       });
//       console.log("Producto creado:", createdProduct);
//     }
//       res.status(200).json("Productos importados correctamente");
//   } catch (error) {
//     console.error("Error al importar productos:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }); 

router.get("/products/search", searchProduct);

router.get("/products", getProductID);

router.get("/product", authMiddleware, getProducts);

router.post("/product", authMiddleware, createProduct);

router.put("/product/:id", authMiddleware, updateProduct);

router.delete("/product/:id", authMiddleware, deleteProduct);

router.get("/products/category", getCategory);

router.post("/products/category", authMiddleware, createCategory);

router.put("/products/category/:id", authMiddleware, updateCategory);

router.delete("/products/category/:id", authMiddleware, deleteCategory);

export default router;
