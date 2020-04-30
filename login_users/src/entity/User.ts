import {Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty} from "class-validator";
import * as bcrypt from "bcryptjs";
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

   hashPassword(): void{
       const salt = bcrypt.genSaltSync(10);
       this.password = bcrypt.hashSync(this.password, salt);
   }

   checkPassword(password: string): boolean{
       return bcrypt.compareSync(password, this.password);
   }

}
