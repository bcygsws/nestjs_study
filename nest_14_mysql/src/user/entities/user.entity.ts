import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    // @Generated("uuid")
    // uuid: string;

    @Column()
    user: string;

    @Column({select: true})// 默认值为true,当select: true时，查询时会返回该字段
    password: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @Column("simple-array")
    roles: string[];

    @Column("simple-json")
    info: { name: string, age: number }
}

