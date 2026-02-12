import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, nullable: false})
    name: string;

    @Column({length: 128, nullable: true})
    desc: string;

    // 创建时间所在列，类型为时间戳,必须声明，否则报错
    // Data truncated for column 'createdAt'
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
}
