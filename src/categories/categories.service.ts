import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category){}
  async create(createCategoryDto: CreateCategoryDto) {

    const categoryData = await this.categoryModel.findOne({where: {title: createCategoryDto.title}})
    if(categoryData){
      throw new ConflictException(`${categoryData.title} nomli categoriya o'zi mavjud`)
    }

    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findOne(id: number) {
    const data = await this.categoryModel.findOne({where:{id}})
    if(!data){
      throw new NotFoundException('Bu Categoy topilmadi')
    }
    return data;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const data = await this.findOne(id)
      

    return await this.categoryModel.update(updateCategoryDto,{where: {id}});
  }

  async remove(id: number) {
    const data = await this.findOne(id)

    return await this.categoryModel.destroy({where: {id}});
  }

}
