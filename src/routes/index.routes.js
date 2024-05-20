import express from 'express';
import indexController from '../controllers/index.controller';

const router = express.Router();

// Rutas existentes
router.get('/', indexController.index);
router.get('/ListarEmpleados', indexController.listarEmpleados);
router.get('/Eliminar/:cedula_e', indexController.EliminarEmpleado);
router.post('/GuardarEmpleado', indexController.GuardarEmpleado);
router.get('/Editar/:cedula_e', indexController.EditarEmpleado);
router.post('/ActualizarEmpleado/:cedula_e', indexController.ActualizarEmpleado);
router.post('/btnBuscarEmpleado', indexController.BuscarEmpleado);
router.get('/index', indexController.index)
router.get('/login', indexController.login)
router.post('/IniciarSesion', indexController.iniciarSesion)

export default router;
