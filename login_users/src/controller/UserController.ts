import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";
import { Server } from "http";

export class UserController {
    //method getAll
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        if (users.length > 0 ){
            res.send(users);
        } else {
            res.status(404).json({ message: "Not result"});
        }
    };

    //method getById
    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (err) {
            res.status(404).json({ message: "Not result"});
        }

    };

    //method newUser
    static newUser = async (req: Request, res: Response) => {
        const { username, password, role, name, surname, document_type, identification, email, telephone, birthdate  } = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;
        user.name = name;
        user.surname = surname;
        user.document_type = document_type;
        user.identification = identification;
        user.email = email;
        user.telephone = telephone;
        user.birthdate = birthdate;
        

        //validate 
        const errors = await validate(user);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        //TODO: hash password 

        const userRepository = getRepository(User);
        try{
            await userRepository.save(user);
        } catch(err){
            return res.status(409).json({ message: "Username already exist"});
        }
        // all ok
        res.send("User created");
    };

    //method editUser
    static editUser = async (req: Request, res: Response) => {
        let user;
        const {id} = req.params;
        const {username, role } = req.body;

        const userRepository = getRepository(User)
        //try get user
        try{
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.role = role;
        } catch(err){
            return res.status(404).json({ message: "User not found"})
        }

        const errors = await validate(user);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save user
        try{
            await userRepository.save(user);
        } catch(err){
            return res.status(409).json({ message: "Username already in use"});
        }

        res.status(201).json({ message: "User update"});
    };

    //method delete
    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(id);
        } catch(err){
            return res.status(404).json({ message: "User not found"})
        }

        //delete user
        userRepository.delete(id);
        res.status(201).json({ message: "User deleted"});
    };
}

export default UserController;