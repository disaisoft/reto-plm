import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import config from "../config/config";
import * as jwt from "jsonwebtoken";


class AuthController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).json({ message: "Username & Password are required!" });
        }

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (err) {
            return res.status(400).json({ message: " Username  or password incorrect" });
        }

        //Check password 
        if(!user.checkPassword(password)){
            return res.status(400).json({message: "Username of password incorrect"})
        }

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn: "1h"});

        res.json({ message: "OK", token});
    };
}

export default AuthController;