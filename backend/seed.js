require ('dotenv').config();
const db = require('./db');
const bcrypt = require('bcrypt');

async function seedDatabase() {
    try {
        console.log('Iniciando el proceso de seed de la base de datos...');

        // 1) Limpiar tablas en orden inverso para evitar problemas de claves foráneas
        await db.query('DELETE FROM transacciones');
        await db.query('DELETE FROM tarjetas');
        await db.query('DELETE FROM auditorias');
        await db.query('DELETE FROM usuarios');
        
        // Reiniciar contadores de auto-incremento
        await db.query('ALTER TABLE usuarios AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE tarjetas AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE transacciones AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE auditorias AUTO_INCREMENT = 1');

        console.log('Tablas limpiadas correctamente.');

        //2) Generar contrseñas hasheadas para los usuarios
        const saltRounds = 10;
        const passCliente = await bcrypt.hash('cliente123', saltRounds);
        const passMartina = await bcrypt.hash('martina123', saltRounds);
        const passNicolas = await bcrypt.hash('nicolas123', saltRounds);
        const passSofia = await bcrypt.hash('sofia123', saltRounds);
        const passTomas = await bcrypt.hash('tomas123', saltRounds);
        const passAdmin = await bcrypt.hash('adminpassword', saltRounds);

           // 3. Insertar Usuarios y capturar sus IDs autoincrementales
        const [resClient1] = await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado, cbu, alias, saldo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            ['Federico García', 'cliente@novabank.com', passCliente, '12345678', 'client', 'Cuenta activa', '0000003100012345678901', 'fede.nova.bank', 1248370.50]
        );
        const user1Id = resClient1.insertId;
        const [resClient2] = await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado, cbu, alias, saldo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            ['Martina Ruiz', 'martina@novabank.com', passMartina, '87654321', 'client', 'Cuenta activa', '0000003100098765432109', 'martina.nova.bank', 485000.00]
        );
        const user2Id = resClient2.insertId;
        const [resClient3] = await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado, cbu, alias, saldo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            ['Nicolás Pérez', 'nicolas@novabank.com', passNicolas, '44455566', 'client', 'Cuenta activa', '0000003100044455566677', 'nicolas.nova.bank', 350000.00]
        );
        const user3Id = resClient3.insertId;
        const [resClient4] = await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado, cbu, alias, saldo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            ['Sofía Rodríguez', 'sofia@novabank.com', passSofia, '40111222', 'client', 'Cuenta activa', '0000003100072011122233', 'sofia.rodriguez.nova', 720000.00]
        );
        const user4Id = resClient4.insertId;
        const [resClient5] = await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado, cbu, alias, saldo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            ['Tomás Benítez', 'tomas@novabank.com', passTomas, '39222333', 'client', 'Cuenta activa', '0000003100091522233344', 'tomas.benitez.nova', 915000.00]
        );
        const user5Id = resClient5.insertId;
        // Crear el Administrador
        await db.query(
            `INSERT INTO usuarios (nombre, email, contrasena, dni, rol, estado) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            ['Admin Nova', 'admin@novabank.com', passAdmin, '11111111', 'admin', 'Cuenta activa']
        );
        console.log('Usuarios de prueba creados.');
        // 4. Insertar Tarjetas vinculadas a los IDs de los usuarios
        // Federico García (user1Id)
        await db.query(
            `INSERT INTO tarjetas (usuario_id, tipo, numero, titular, vencimiento, cvv, congelada) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user1Id, 'Débito NovaBank', '4509123412343456', 'Federico García', '08/28', '583', 0]
        );
        await db.query(
            `INSERT INTO tarjetas (usuario_id, tipo, numero, titular, vencimiento, cvv, congelada) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user1Id, 'Crédito NovaBank', '5364123498761122', 'Federico García', '11/29', '214', 0]
        );
        // Martina Ruiz (user2Id)
        await db.query(
            `INSERT INTO tarjetas (usuario_id, tipo, numero, titular, vencimiento, cvv, congelada) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user2Id, 'Débito NovaBank', '4509777711112222', 'Martina Ruiz', '05/28', '739', 0]
        );
        // Nicolás Pérez (user3Id)
        await db.query(
            `INSERT INTO tarjetas (usuario_id, tipo, numero, titular, vencimiento, cvv, congelada) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user3Id, 'Débito NovaBank', '4509888833334444', 'Nicolás Pérez', '02/29', '462', 0]
        );
        await db.query(
            `INSERT INTO tarjetas (usuario_id, tipo, numero, titular, vencimiento, cvv, congelada) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user3Id, 'Crédito NovaBank', '5364555566667777', 'Nicolás Pérez', '09/30', '905', 0]
        );
        console.log('Tarjetas de prueba creadas.');
        // 5. Insertar Transacciones iniciales para Federico
        await db.query(
            `INSERT INTO transacciones (usuario_id, tipo, titulo, monto, icono) 
             VALUES (?, ?, ?, ?, ?)`,
            [user1Id, 'expense', 'Transferencia a Martina', 20000.00, 'transfer']
        );
        await db.query(
            `INSERT INTO transacciones (usuario_id, tipo, titulo, monto, icono) 
             VALUES (?, ?, ?, ?, ?)`,
            [user1Id, 'income', 'Acreditación sueldo', 85000.00, 'salary']
        );
        await db.query(
            `INSERT INTO transacciones (usuario_id, tipo, titulo, monto, icono) 
             VALUES (?, ?, ?, ?, ?)`,
            [user1Id, 'expense', 'Mercado Libre', 12490.00, 'shopping']
        );
        console.log('Transacciones de prueba creadas.');
        console.log('¡Base de datos populada con éxito!');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}
seedDatabase();
    
