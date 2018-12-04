import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Policy {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({
        name: 'amount_insured',
    })
    public amountInsured: number;

    @Column({
        name: 'email',
    })
    public email: string;

    @IsNotEmpty()
    @Column({
        name: 'inception_date',
    })
    public inceptionDate: Date;

    @IsNotEmpty()
    @Column({
        name: 'installment_payment',
    })
    public installmentPayment: boolean;

    @Column({
        name: 'client_id',
        nullable: true,
    })
    public clientId: string;

    @ManyToOne(type => User, user => user.policies)
    @JoinColumn({ name: 'client_id' })
    public client: User;
}
