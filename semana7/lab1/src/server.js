import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/users-routes.js';
import seedRoles from './utils/seed-roles.js';
import seedUsers from './utils/seed-user.js';
dotenv.config();

const app = express();

// Habilitar CORS para todos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//EJS + vistas
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Validar estado del servidor
app.get('/health', (req, res) => res.status(200).json({ ok: true }));
app.get('/signin', (req, res) => res.render('signin'));
app.get('/signup', (req, res) => res.render('signup')); 
app.get('/profile', (req, res) => res.render('profile')); 
app.get('/dashboard-user', (req, res) => res.render('dashboard-user'));
app.get('/dashboard-admin', (req, res) => res.render('dashboard-admin'));


// Página 404 para rutas inexistentes
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error(err);

  if (err.status === 403) {
    return res.status(403).render('403');
  }

  res.status(err.status || 500).json({ 
    message: err.message || 'Error interno del servidor' 
  });
});


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
    .then(async () => {
        console.log('Mongo connected');
        await seedRoles();
        await seedUsers();
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(err => {
        console.error('Error al conectar con Mongo:', err);
        process.exit(1);
    });