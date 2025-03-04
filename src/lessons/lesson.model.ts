import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";

@Table({tableName: 'lessons'})
export class Lesson extends Model<Lesson>{
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    title: string

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id : number

    @Column({ defaultValue: new Date() })
    date: Date;

    @BelongsTo(() => Course)
    course: Course
}