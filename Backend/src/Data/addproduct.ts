// script.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CategoryData {
  name: string;
}
async function main() {
  // Crear categorías
  const categoriesData: CategoryData[] = [
    { name: "Watch Accessories" }, // cat-1
    { name: "Chargers" }, // cat-2
    { name: "Earphones" }, // cat-3
    { name: "Mice" }, // cat-4
    { name: "Controllers" }, // cat-5
    { name: "Phone Cases" }, // cat-6
    { name: "Memory Storage" }, // cat-7
    { name: "Adapters" }, // cat-8
    { name: "Car Chargers" }, // cat-9
    { name: "Phone Accessories" }, // cat-10
    { name: "Cables" }, // cat-11
    { name: "Camera Protectors" }, // cat-12
    { name: "Power Banks" }, // cat-13
    { name: "Smart Watches" }, // cat-14
    { name: "Batteries" }, // cat-15
    { name: "Keyboards" }, // cat-16
    { name: "Wireless Earphones" }, // cat-17
    { name: "Headphones" }, // cat-18
  ];

  // Insertar categorías y mapear nombres a IDs
  const categoriesMap: Record<string, string> = {};

  for (const categoryData of categoriesData) {
    const category = await prisma.category.create({
      data: categoryData,
    });
    categoriesMap[category.name] = category.id;
  }

  // Datos de productos con categoryId actualizados
  const productsData = [
    {
      name: "Manillas de relojes Miban",
      description: "Correas para relojes Miban.",
      imagen: "https://m.media-amazon.com/images/I/81Pzsse6JFL._AC_SY500_.jpg",
      price: 7.0,
      categoryId: categoriesMap["Watch Accessories"],
    },
    {
      name: "Cargadores de relojes Miban",
      description: "Cargadores para relojes Miban.",
      imagen: "https://m.media-amazon.com/images/I/51BJiFN4wpL._SL1000_.jpg",
      price: 7.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargadores de reloj redondo",
      description: "Cargadores para relojes redondos.",
      imagen:"https://m.media-amazon.com/images/I/41llLZM3HTL._AC_SL1200_.jpg",
      price: 8.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador fly (micro y tipo C) completo",
      description: "Cargador fly con micro y tipo C completo.",
      price: 12.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador fly piña sola",
      description: "Adaptador (piña) del cargador fly.",
      price: 7.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador fly cable solo",
      description: "Cable del cargador fly.",
      price: 5.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador Harvic (tipo C y micro) completo",
      description: "Cargador Harvic con tipo C y micro completo.",
      price: 10.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Harvic piña sola",
      description: "Adaptador (piña) del cargador Harvic.",
      price: 5.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Harvic cable solo",
      description: "Cable del cargador Harvic.",
      price: 5.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador Xiaomi 67W completo",
      description: "Cargador completo Xiaomi de 67W.",
      price: 20.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Xiaomi 67W piña sola",
      description: "Adaptador (piña) del cargador Xiaomi 67W.",
      price: 13.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Xiaomi 67W cable solo",
      description: "Cable del cargador Xiaomi 67W.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador de iPhone 5W completo",
      description: "Cargador completo de iPhone 5W.",
      price: 12.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador de iPhone 5W piña sola",
      description: "Adaptador (piña) del cargador de iPhone 5W.",
      price: 7.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador de iPhone 5W cable solo",
      description: "Cable del cargador de iPhone 5W.",
      price: 5.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador iPhone tipo C a Lightning de 20W completo",
      description: "Cargador de iPhone tipo C a Lightning de 20W completo.",
      price: 20.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador iPhone 20W piña sola",
      description: "Adaptador (piña) del cargador iPhone 20W.",
      price: 13.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador iPhone 20W cable solo",
      description: "Cable del cargador iPhone 20W.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador Samsung tipo C a tipo C 25W completo",
      description: "Cargador Samsung tipo C a tipo C de 25W completo.",
      price: 25.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Samsung 25W piña sola",
      description: "Adaptador (piña) del cargador Samsung 25W.",
      price: 18.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Samsung 25W cable solo",
      description: "Cable del cargador Samsung 25W.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cargador tipo C a tipo C 20W",
      description: "Cargador tipo C a tipo C de 20W, carga en 1 hora.",
      price: 20.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador tipo C a tipo C 30W",
      description: "Cargador tipo C a tipo C de 30W, carga en 1 hora.",
      price: 25.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Samsung tipo C a tipo C 45W completo",
      description: "Cargador Samsung tipo C a tipo C de 45W completo.",
      price: 30.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Samsung 45W piña sola",
      description: "Adaptador (piña) del cargador Samsung 45W.",
      price: 23.0,
      categoryId: categoriesMap["Chargers"],
    },
    {
      name: "Cargador Samsung 45W cable solo",
      description: "Cable del cargador Samsung 45W.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Manos libres AKG",
      description: "Auriculares AKG.",
      price: 4.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres MI",
      description: "Auriculares MI.",
      price: 3.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres de colores plásticos",
      description: "Auriculares de colores de plástico.",
      price: 3.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres Mulazon",
      description: "Auriculares Mulazon.",
      price: 5.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres Zuga",
      description: "Auriculares Zuga.",
      price: 6.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres Buytiti",
      description: "Auriculares Buytiti.",
      price: 5.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Manos libres blanco S6 y J5",
      description: "Auriculares blancos para S6 y J5.",
      price: 2.0,
      categoryId: categoriesMap["Earphones"],
    },
    {
      name: "Mouse inalámbrico",
      description: "Ratón inalámbrico.",
      price: 15.0,
      categoryId: categoriesMap["Mice"],
    },
    {
      name: "Mouse gamer",
      description: "Ratón para gaming.",
      price: 24.0,
      categoryId: categoriesMap["Mice"],
    },
    {
      name: "Mandos universales",
      description: "Controles universales.",
      price: 12.0,
      categoryId: categoriesMap["Controllers"],
    },
    {
      name: "Covers robóticos, argolla, accesorios o con pulsos",
      description: "Fundas robóticas, con argolla, accesorios o con pulsos.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Covers S",
      description: "Todos los covers S.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Covers de iPhone",
      description: "Fundas para iPhone.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Covers de iPhone con carga inalámbrica",
      description: "Fundas de iPhone con carga inalámbrica.",
      price: 12.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Cover gamuza silicona",
      description: "Fundas de gamuza de silicona.",
      price: 8.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Cover acuático",
      description: "Fundas acuáticas.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Cover de goma y plástico",
      description: "Fundas de goma y plástico.",
      price: 7.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Cover de brazo",
      description: "Fundas de brazo.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Cover de librito",
      description: "Fundas tipo libro.",
      price: 10.0,
      categoryId: categoriesMap["Phone Cases"],
    },
    {
      name: "Micro SD de 32 GB",
      description: "Tarjeta Micro SD de 32 GB.",
      price: 12.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "USB de 32 GB",
      description: "Memoria USB de 32 GB.",
      price: 12.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "USB de 64 GB",
      description: "Memoria USB de 64 GB.",
      price: 15.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "Micro SD de 128 GB",
      description: "Tarjeta Micro SD de 128 GB.",
      price: 20.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "Micro SD de 256 GB",
      description: "Tarjeta Micro SD de 256 GB.",
      price: 23.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "Micro SD de 512 GB",
      description: "Tarjeta Micro SD de 512 GB.",
      price: 26.0,
      categoryId: categoriesMap["Memory Storage"],
    },
    {
      name: "Adaptador para Micro SD",
      description: "Adaptador para tarjeta Micro SD.",
      price: 7.0,
      categoryId: categoriesMap["Adapters"],
    },
    {
      name: "Adaptador de Bluetooth",
      description: "Adaptador Bluetooth que parece memoria.",
      price: 7.0,
      categoryId: categoriesMap["Adapters"],
    },
    {
      name: "Adaptador Bluetooth con mando",
      description: "Adaptador Bluetooth con control remoto.",
      price: 15.0,
      categoryId: categoriesMap["Adapters"],
    },
    {
      name: "Cargador de celular para el carro 1 entrada",
      description: "Cargador de auto con 1 entrada.",
      price: 7.0,
      categoryId: categoriesMap["Car Chargers"],
    },
    {
      name: "Cargador de celular para el carro 2 entradas con cable",
      description: "Cargador de auto con 2 entradas y cable.",
      price: 10.0,
      categoryId: categoriesMap["Car Chargers"],
    },
    {
      name: "Cargador de celular para el carro 5 entradas",
      description: "Cargador de auto con 5 entradas.",
      price: 15.0,
      categoryId: categoriesMap["Car Chargers"],
    },
    {
      name: "PopSocket redonditos",
      description: "Soportes PopSocket redondos.",
      price: 1.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "PopSocket muñecos",
      description: "Soportes PopSocket con muñecos.",
      price: 3.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "PopSocket Astronauta",
      description: "Soporte PopSocket de astronauta.",
      price: 5.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "PopSocket de espejo",
      description: "Soporte PopSocket con espejo.",
      price: 7.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Adornos de teléfonos (pulsos)",
      description: "Adornos para teléfonos tipo pulsera.",
      price: 4.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Collares de teléfono",
      description: "Collares para teléfono.",
      price: 5.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Cable HDMI 1.5 m",
      description: "Cable HDMI de 1.5 metros.",
      price: 8.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cable HDMI 3 m",
      description: "Cable HDMI de 3 metros.",
      price: 10.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cable de disco duro externo",
      description: "Cable para disco duro externo.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Extensión USB",
      description: "Extensión de cable USB.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables DVD y cajita",
      description: "Cables para DVD y cajita digital.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables plus a plus",
      description: "Cables de plug a plug.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables RCA x mini plus",
      description: "Cables RCA a mini plug.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Protector de cámara iPhone 13 Pro Max y 14 Pro Max",
      description: "Protector de cámara para iPhone 13 Pro Max y 14 Pro Max.",
      price: 5.0,
      categoryId: categoriesMap["Camera Protectors"],
    },
    {
      name: "Cable tipo C a Lightning sin caja",
      description: "Cable tipo C a Lightning sin caja.",
      price: 8.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cable tipo C a Lightning en caja",
      description: "Cable tipo C a Lightning con caja.",
      price: 10.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables micro o tipo C sueltos",
      description: "Cables micro USB o tipo C sin caja.",
      price: 4.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables micro o tipo C en caja",
      description: "Cables micro USB o tipo C con caja.",
      price: 5.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables iPhone sueltos",
      description: "Cables de iPhone sin caja.",
      price: 5.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables iPhone en caja",
      description: "Cables de iPhone con caja.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cables fly en bolsita",
      description: "Cables fly en bolsa.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cable suelto tipo C a tipo C",
      description: "Cable tipo C a tipo C sin caja.",
      price: 7.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Cable tipo C a tipo C en caja",
      description: "Cable tipo C a tipo C con caja.",
      price: 20.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Powerbank de 20000mAh (marca variable)",
      description: "Powerbank de 20000mAh, precio según marca.",
      price: 40.0,
      categoryId: categoriesMap["Power Banks"],
    },
    {
      name: "Powerbank de 20000mAh (marca variable)",
      description: "Powerbank de 20000mAh, precio según marca.",
      price: 50.0,
      categoryId: categoriesMap["Power Banks"],
    },
    {
      name: "Powerbank de 20000mAh (marca variable)",
      description: "Powerbank de 20000mAh, precio según marca.",
      price: 60.0,
      categoryId: categoriesMap["Power Banks"],
    },
    {
      name: "Powerbank de 20000mAh (marca variable)",
      description: "Powerbank de 20000mAh, precio según marca.",
      price: 70.0,
      categoryId: categoriesMap["Power Banks"],
    },
    {
      name: "Powerbank de 10000mAh",
      description: "Powerbank de 10000mAh.",
      price: 30.0,
      categoryId: categoriesMap["Power Banks"],
    },
    {
      name: "Reloj Inteligente",
      description: "Smartwatch.",
      price: 50.0,
      categoryId: categoriesMap["Smart Watches"],
    },
    {
      name: "Reloj Inteligente",
      description: "Smartwatch.",
      price: 40.0,
      categoryId: categoriesMap["Smart Watches"],
    },
    {
      name: "Pilas AA y AAA (par)",
      description: "Pilas AA y AAA, precio por par.",
      price: 500.0,
      categoryId: categoriesMap["Batteries"],
    },
    {
      name: "Pilas Alkaline para linterna",
      description: "Pilas alcalinas para linterna.",
      price: 2000.0,
      categoryId: categoriesMap["Batteries"],
    },
    {
      name: "OTG",
      description: "Adaptador OTG.",
      price: 4.0,
      categoryId: categoriesMap["Adapters"],
    },
    {
      name: "Teclado DK500",
      description: "Teclado modelo DK500.",
      price: 24.0,
      categoryId: categoriesMap["Keyboards"],
    },
    {
      name: "Extensión USB para laptop",
      description: "Extensión USB para laptop.",
      price: 15.0,
      categoryId: categoriesMap["Cables"],
    },
    {
      name: "Manos libres inalámbricos negros",
      description: "Auriculares inalámbricos negros.",
      price: 15.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Manos libres inalámbricos X10",
      description: "Auriculares inalámbricos modelo X10.",
      price: 20.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Inalámbricos Pure Bass, CZU, M59",
      description: "Auriculares inalámbricos Pure Bass, CZU, M59.",
      price: 30.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Inalámbrico 1 Hora",
      description: "Auriculares inalámbricos con 1 hora de carga.",
      price: 24.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Inalámbricos JBL",
      description: "Auriculares inalámbricos JBL.",
      price: 30.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Inalámbricos Probus",
      description: "Auriculares inalámbricos Probus.",
      price: 30.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Manilla de reloj con mica",
      description: "Manilla de reloj con mica protectora.",
      price: 8.0,
      categoryId: categoriesMap["Watch Accessories"],
    },
    {
      name: "Soporte de celular para el carro - calidad baja",
      description: "Soporte de celular para el carro de calidad baja.",
      price: 8.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Soporte de celular para el carro - calidad media",
      description: "Soporte de celular para el carro de calidad media.",
      price: 15.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Soporte de celular para el carro - calidad alta",
      description: "Soporte de celular para el carro de calidad alta.",
      price: 20.0,
      categoryId: categoriesMap["Phone Accessories"],
    },
    {
      name: "Manos libres inalámbricos orejón (gatico y Sony)",
      description: "Auriculares inalámbricos orejón modelos gatico y Sony.",
      price: 30.0,
      categoryId: categoriesMap["Wireless Earphones"],
    },
    {
      name: "Audífonos orejón para PC",
      description: "Audífonos orejón para PC.",
      price: 30.0,
      categoryId: categoriesMap["Headphones"],
    },
    {
      name: "Orejones iPhone",
      description: "Audífonos orejón para iPhone.",
      price: 80.0,
      categoryId: categoriesMap["Headphones"],
    },
  ];

  // Insertar productos en la base de datos
  for (const productData of productsData) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log("Categorías y productos guardados exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
