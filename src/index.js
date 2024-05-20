import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import router from './routes/index.routes';
import sql from 'mssql'; // Importa el módulo mssql

const app = express();

// Configuración de carpetas de plantillas y públicas
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

// Especificamos que podemos trabajar con archivos JSON y manejar URL complejas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Especificar la carpeta estática
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el manejador de plantillas
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Integrar las rutas
app.use(router);

// Establecer conexión a la base de datos
sql.connect(config)
    .then(() => {
        console.log("Conexión exitosa a la base de datos");
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });

app.listen(config.port, () => {
    console.log("Estamos activos");
});
