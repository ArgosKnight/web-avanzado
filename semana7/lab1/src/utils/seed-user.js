import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository.js";
import roleRepository from "../repositories/role-repository.js";

export default async function seedUsers() {
    const adminExists = await userRepository.findByEmail("admin@example.com");
    if (!adminExists) {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);
        const hashed = await bcrypt.hash("Admin123@", saltRounds);

        const adminRole = await roleRepository.findByName("admin");

        await userRepository.create({
            name: "Super",
            lastName: "Admin",
            email: "admin@example.com",
            password: hashed,
            phoneNumber: "999999999",
            birthdate: new Date("1990-01-01"),
            adress: "Oficina Central",
            roles: [adminRole._id]
        });

        console.log("Usuario admin creado: admin@example.com / Admin123@");
    }
}
