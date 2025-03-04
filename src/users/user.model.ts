import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";
import { Enrollment } from "src/enrollments/enrollment.model";
import { LessonAttendace } from "src/lesson_attendances/lesson_attendance.model";

@Table({ tableName: 'users' })
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
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
            is: /^[0-9]+$/,
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


    @HasMany(() => Course, {foreignKey: 'teacher_id', as: 'teacherCourses'})
    teacherCourses: Course[]
    
    @BelongsToMany(() => Course, {
      through: () => Enrollment,
      foreignKey: 'user_id',
      otherKey: 'course_id',
      as: 'studentCourses'
    }) 
    studentCourses: Course[];


    @HasMany(() => LessonAttendace)
    lesson_attendances: LessonAttendace[]
}
