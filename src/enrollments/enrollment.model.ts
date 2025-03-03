import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";
import { User } from "src/users/user.model";

@Table({tableName: 'enrollments'})
export class Enrollment extends Model<Enrollment>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id: number

    @Column({ defaultValue: new Date() })
    enrollmentDate: Date;

    @BelongsTo(() => Course)
    course: Course;

    @BelongsTo(() => User)
    student: User;
}