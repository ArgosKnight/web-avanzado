import authService from '../services/auth-services.js';
import jwt from 'jsonwebtoken';

class AuthController {
    async signUp(req, res, next) {
        try {
            const payload = req.body;
            if (!payload.email || !payload.password) 
                return res.status(400).json({ message: 'El email y password son requeridos' });
            
            const user = await authService.signUp(payload);
            return res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) 
                return res.status(400).json({ message: 'El email y password son requeridos' });

            const { token } = await authService.signIn({ email, password });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.roles.includes("admin")) {
                return res.status(200).json({ token, redirect: "/dashboard-admin" });
            } else {
                return res.status(200).json({ token, redirect: "/dashboard-user" });
            }
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
