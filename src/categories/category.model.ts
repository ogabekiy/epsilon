import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";

@Table({tableName: 'categories'})
export class Category extends Model<Category>{
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    description: string

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    category_img: string

    @HasMany(() => Course)
    courses: Course[]
}