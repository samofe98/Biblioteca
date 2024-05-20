import sql from 'mssql';

// Configuración de la conexión a la base de datos
const config = {
    user: 'tdea',
    password: '123',
    server: 'SANTIAGO\SQLEXPRESS', // Por ejemplo, 'localhost'
    database: 'DesarrolloWeb'
};

// Función para autenticar al usuario
async function tuFuncionDeAutenticacion(email, contraseña) {
    try {
        // Establecer conexión a la base de datos
        await sql.connect(config);

        // Consulta SQL para verificar las credenciales del usuario
        const result = await sql.query`SELECT * FROM Usuarios WHERE email = ${email} AND contraseña = ${contraseña}`;

        // Cerrar la conexión a la base de datos
        await sql.close();

        // Verificar si se encontraron resultados
        if (result.recordset.length > 0) {
            console.log('Inicio de sesión exitoso'); // Mensaje de éxito
            return true; // Usuario autenticado
        } else {
            console.log('Usuario no encontrado'); // Mensaje de usuario no encontrado
            return false; // Credenciales incorrectas
        }
    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        throw error; // Lanzar el error para que sea manejado por la aplicación
    }
}

export { tuFuncionDeAutenticacion };
