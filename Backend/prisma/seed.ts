// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Verificar si el usuario admin ya existe
  const existingAdmin = await prisma.baseUser.findUnique({
    where: { username: 'admin' },
    include: { administrator: true }
  });

  if (existingAdmin) {
    console.log('El usuario administrador ya existe:', existingAdmin);
    return;
  }

  // Hash de la contraseña
  const hashedPassword = await bcryptjs.hash('*reycel*4dm1n', 10);

  // Crear el usuario base
  const adminUser = await prisma.baseUser.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      status: true, // Activamos el usuario
      administrator: {
        create: {
          role: Role.OWNER, // Asignamos el rol más alto
        }
      }
    },
    include: {
      administrator: true
    }
  });

  console.log('Usuario administrador creado:', adminUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });