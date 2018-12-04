import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Policy } from './Policy';

@Entity()
export class User {

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(password === user.name);
        });
    }

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @IsNotEmpty()
    @Column()
    public role: string;

    @OneToMany(type => Policy, policy => policy.client)
    public policies?: Policy[];

    public toString(): string {
        return `${this.name} (${this.email})`;
    }

}
