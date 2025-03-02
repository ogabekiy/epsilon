import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";

@Table({tableName: 'rooms'})
export class Room extends Model<Room>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string

    @HasMany(() => Course)
    courses: Course[]
}