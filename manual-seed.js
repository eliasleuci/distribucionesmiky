const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Iniciando carga del usuario admin en Supabase...');

    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        }
    });

    await prisma.systemSettings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            enableStock: true
        }
    });

    console.log('✅ Usuario admin y configuración inicial verificados.');
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
