import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lessons/lesson.model";
import { User } from "src/users/user.model";

@Table({tableName: 'lesson_attendances'})
export class LessonAttendace extends Model<LessonAttendace>{
    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER,
        allowNull :false
    })
    lesson_id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull :false
    })
    student_id: number

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    attendance_status: boolean

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    performance: number

    @BelongsTo(() => Lesson)
    lesson: Lesson

    @BelongsTo(() => User)
    user: User
}