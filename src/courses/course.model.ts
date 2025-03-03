import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/category.model";
import { Enrollment } from "src/enrollments/enrollment.model";
import { Lesson } from "src/lessons/lesson.model";
import { Room } from "src/rooms/room.model";
import { User } from "src/users/user.model";

@Table({tableName: 'courses'})
export class Course extends Model<Course>{
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


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    teacher_id: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    category_id: number

    @Column({
        type: DataType.DATE,
        allowNull:true
    })
    start_date: Date

    @Column({
        type: DataType.DATE,
        allowNull:true
    })
    end_date: Date

    @Column({
        type: DataType.STRING,
        allowNull:true,
        validate: {
            isIn: [['pending', 'active', 'completed']],
        },
        defaultValue: 'pending'
    })
    status: string


    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    room_id: number

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    start_time: string

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    end_time: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isIn: [['odd', 'even']],
        },
    })
    days: string

    @BelongsTo(() => User, {foreignKey: 'teacher_id', as: 'teacher'})
    teacher: User

    @BelongsTo(() => Category)
    category: Category

    @BelongsTo(() => Room)
    room: Room

     @BelongsToMany(() => User, {
      through: () => Enrollment,
      foreignKey: 'course_id',
      otherKey: 'user_id',
      as: 'students'
    })
    students: User[];

    @HasMany(() => Lesson)
    lessons: Lesson[]
}