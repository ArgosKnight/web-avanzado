// src/middlewares/authenticate.js
import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            const error = new Error('No autorizado');
            error.status = 401;
            return next(error);
        }

        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = payload.sub;
        req.userRoles = payload.roles || [];

        next();
    } catch (err) {
        const error = new Error('Token no válido o caducado');
        error.status = 401;
        return next(error);
    }
}
