/* eslint-disable prettier/prettier */
import { Company } from "src/company/entities/company.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    email: string;

    @OneToOne(() => Company, company => company.user)
    company: Company;

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;
}
