import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Configuración inicial del sistema
  const configuraciones = [
    {
      clave: 'TOTAL_ESPACIOS',
      valor: '100',
      descripcion: 'Número total de espacios en la bodega',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'TEMPERATURA_MIN_DEFAULT',
      valor: '-18.0',
      descripcion: 'Temperatura mínima por defecto (°C)',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'TEMPERATURA_MAX_DEFAULT',
      valor: '-15.0',
      descripcion: 'Temperatura máxima por defecto (°C)',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'TARIFA_DIARIA',
      valor: '50.00',
      descripcion: 'Tarifa diaria por espacio (USD)',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'TARIFA_SEMANAL',
      valor: '300.00',
      descripcion: 'Tarifa semanal por espacio (USD)',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'TARIFA_MENSUAL',
      valor: '1000.00',
      descripcion: 'Tarifa mensual por espacio (USD)',
      tipo: 'NUMERO' as const
    },
    {
      clave: 'EMPRESA_NOMBRE',
      valor: 'FROS - Bodega de Congelados',
      descripcion: 'Nombre de la empresa',
      tipo: 'TEXTO' as const
    },
    {
      clave: 'EMPRESA_EMAIL',
      valor: 'info@fros.com',
      descripcion: 'Email de contacto de la empresa',
      tipo: 'TEXTO' as const
    },
    {
      clave: 'DESCUENTO_VOLUMEN',
      valor: '{"5_espacios": 5, "10_espacios": 10, "20_espacios": 15}',
      descripcion: 'Descuentos por volumen de espacios (%)',
      tipo: 'JSON' as const
    },
    {
      clave: 'DESCUENTO_TIEMPO',
      valor: '{"3_meses": 5, "6_meses": 10, "12_meses": 20}',
      descripcion: 'Descuentos por tiempo de contrato (%)',
      tipo: 'JSON' as const
    }
  ];

  // Insertar configuraciones
  for (const config of configuraciones) {
    await prisma.configuracion.upsert({
      where: { clave: config.clave },
      update: config,
      create: config,
    });
  }

  // Crear usuario administrador por defecto
  const adminPassword = await hashPassword('Admin123!');
  const adminUser = await prisma.usuario.upsert({
    where: { email: 'admin@fros.com' },
    update: {},
    create: {
      email: 'admin@fros.com',
      password: adminPassword,
      nombre: 'Administrador',
      apellido: 'Sistema',
      rol: 'ADMIN',
      estado: 'ACTIVO',
      telefono: '+1234567890'
    },
  });

  console.log('👤 Usuario administrador creado:', adminUser.email);

  // Crear usuario operador de ejemplo
  const operatorPassword = await hashPassword('Operator123!');
  const operatorUser = await prisma.usuario.upsert({
    where: { email: 'operador@fros.com' },
    update: {},
    create: {
      email: 'operador@fros.com',
      password: operatorPassword,
      nombre: 'Juan',
      apellido: 'Operador',
      rol: 'OPERADOR',
      estado: 'ACTIVO',
      telefono: '+1234567891',
      invitadoPor: adminUser.id
    },
  });

  console.log('👤 Usuario operador creado:', operatorUser.email);

  // Crear usuarios cliente de ejemplo
  const clientPassword = await hashPassword('Cliente123!');
  const clientUsers = [];

  for (let i = 1; i <= 3; i++) {
    const client = await prisma.usuario.upsert({
      where: { email: `cliente${i}@example.com` },
      update: {},
      create: {
        email: `cliente${i}@example.com`,
        password: clientPassword,
        nombre: `Cliente${i}`,
        apellido: `Apellido${i}`,
        rol: 'CLIENTE',
        estado: 'ACTIVO',
        telefono: `+123456789${i}`,
        invitadoPor: operatorUser.id
      },
    });
    clientUsers.push(client);
    console.log('👤 Usuario cliente creado:', client.email);
  }

  // Crear los 100 espacios
  const totalEspacios = 100;
  const espacios = [];

  for (let i = 1; i <= totalEspacios; i++) {
    const espacio = await prisma.espacio.upsert({
      where: { numero: i },
      update: {},
      create: {
        numero: i,
        estado: 'LIBRE',
        temperaturaMin: -18.0,
        temperaturaMax: -15.0,
        notas: `Espacio ${i.toString().padStart(3, '0')}`
      },
    });
    espacios.push(espacio);
  }

  console.log(`🏢 ${totalEspacios} espacios creados`);

  // Crear algunas reservas de ejemplo
  const fechaInicio = new Date();
  fechaInicio.setDate(fechaInicio.getDate() + 1); // Mañana
  const fechaFin = new Date(fechaInicio);
  fechaFin.setDate(fechaFin.getDate() + 30); // 30 días después

  const reservaEjemplo = await prisma.reserva.create({
    data: {
      clienteId: clientUsers[0]!.id,
      fechaInicio,
      fechaFin,
      estado: 'CONFIRMADA',
      precioTotal: 1500.00,
      codigoAcceso: `QR${Date.now()}`,
      espacios: {
        create: [
          { espacioId: espacios[0]!.id },
          { espacioId: espacios[1]!.id }
        ]
      }
    }
  });

  // Actualizar estado de espacios reservados
  await prisma.espacio.updateMany({
    where: {
      id: {
        in: [espacios[0]!.id, espacios[1]!.id]
      }
    },
    data: { estado: 'OCUPADO' }
  });

  console.log('📋 Reserva de ejemplo creada');

  // Crear pago de ejemplo
  await prisma.pago.create({
    data: {
      reservaId: reservaEjemplo.id,
      clienteId: clientUsers[0]!.id,
      monto: 1500.00,
      metodoPago: 'TRANSFERENCIA',
      estado: 'PAGADO',
      fechaPago: new Date(),
      referencia: 'TRANS001'
    }
  });

  console.log('💰 Pago de ejemplo creado');

  console.log('✅ Seed completado exitosamente!');
  console.log('');
  console.log('🔑 Credenciales de acceso:');
  console.log('👨‍💼 Administrador: admin@fros.com / Admin123!');
  console.log('👷 Operador: operador@fros.com / Operator123!');
  console.log('👤 Clientes: cliente1@example.com, cliente2@example.com, cliente3@example.com / Cliente123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });