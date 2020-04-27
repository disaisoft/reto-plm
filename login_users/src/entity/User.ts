import {Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty} from "class-validator";
//TODO IsEmail

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()  
    username: string;

    @Column()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    document_type: string;

    @Column()
    identification: string;

    @Column()
    email: string;

    @Column()
    telephone: string;
    
    @Column()
    birthdate: string;

    

    
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

}
