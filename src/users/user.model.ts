import { BeforeCreate, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'users' })
export class User extends Model<User> {

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        unique: true
    })
    hh_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [9, 9]
        }
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [9, 9]
        }
    })
    extra_phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isIn: [['user', 'teacher', 'admin']],
        },
        defaultValue: 'user'
    })
    role: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    active: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    birthday: Date;

    @Column({
        type: DataType.STRING,
        allowNull:false,
        validate: {
            isIn: [['male', 'female']],
        },
    })
    gender: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    profile_photo: string;

    

}
