import { getConnection } from "../models/connection";
import sql from 'mssql'; // Asegúrate de importar mssql

const indexController = {};

indexController.index = (req, res) => {
    res.render('index', {
        title: 'BIBLIOTECA'
    });
};

indexController.login = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

indexController.listarEmpleados = async (req, res) => {
    try {
        const con = await getConnection();
        const resultado = await con.request().query("SELECT * FROM DatosEmpleado");
        res.render('ListarEmpleados', {
            title: 'Pagina Empleados',
            data: resultado.recordset
        });
    } catch (error) {
        console.log(error);
    }
};

indexController.GuardarEmpleado = async (req, res) => {
    try {
        const con = await getConnection();
        const { cedula_e, nombre, apellido, fecha_vinculacion, correo_electronico, contrasena, cargo } = req.body;
        await con.request().query(`INSERT INTO DatosEmpleado (cedula_e, nombre, apellido, fecha_vinculacion, correo_electronico,contrasena, cargo) VALUES ('${cedula_e}', '${nombre}', '${apellido}', '${fecha_vinculacion}', '${correo_electronico}', '${contrasena}', '${cargo}')`);
        res.redirect('ListarEmpleados');
    } catch (error) {
        console.log(error);
    }
};

indexController.BuscarEmpleado = async (req, res) => {
    try {
        const con = await getConnection();
        const { txtBuscar } = req.body;
        const resultado = await con.request().query(`SELECT * FROM DatosEmpleado WHERE nombre LIKE '%${txtBuscar}%' OR apellido LIKE '%${txtBuscar}%'`);
        res.render('ListarEmpleados', {
            title: 'Pagina Empleados',
            data: resultado.recordset
        });
    } catch (error) {
        console.log(error);
    }
};

indexController.EditarEmpleado = async (req, res) => {
    try {
        const con = await getConnection();
        const { cedula_e } = req.params;
        const resultado = await con.request().query(`SELECT * FROM DatosEmpleado WHERE cedula_e='${cedula_e}'`);
        res.render('EditarEmpleado', {
            title: 'Editar Empleados',
            data: resultado.recordset[0]
        });
    } catch (error) {
        console.log(error);
    }
};

indexController.ActualizarEmpleado = async (req, res) => {
    try {
        const con = await getConnection();
        const { cedula_e } = req.params;
        const { nombre, apellido, cargo } = req.body;
        await con.request().query(`UPDATE DatosEmpleado SET nombre='${nombre}', apellido='${apellido}', cargo='${cargo}' WHERE cedula_e='${cedula_e}'`);
        res.redirect('/ListarEmpleados');
    } catch (error) {
        console.log(error);
    }
};

indexController.EliminarEmpleado = async (req, res) => {
    try {
        const con = await getConnection();
        const { cedula_e } = req.params;
        await con.request().query(`DELETE FROM DatosEmpleado WHERE cedula_e='${cedula_e}'`);
        res.redirect('/ListarEmpleados');
    } catch (error) {
        console.log(error);
    }
};

indexController.iniciarSesion = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    try {
        const conex = await getConnection();
        const query = `
            SELECT correo_electronico, contrasena 
            FROM DatosEmpleado 
            WHERE correo_electronico = @correo_electronico 
            AND contrasena = @contrasena
        `;

        const result = await conex.request()
            .input("correo_electronico", sql.VarChar, correo_electronico)
            .input("contrasena", sql.VarChar, contrasena)
            .query(query);

        if (result.recordset.length > 0) {
            res.redirect('/ListarEmpleados'); // Cambia esta ruta a la página principal después de un inicio de sesión exitoso
        } else {
            const errorMessage = encodeURIComponent('Credenciales incorrectas');
            res.redirect('/?error=' + errorMessage);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor");
    }
};

export default indexController;
