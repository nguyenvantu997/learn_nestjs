import { Injectable, Scope, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { Cat as CatModel } from './interfaces/cat.interface';
import { AppService } from 'src/app.service';
import { Cat, CatDocument } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto, UpdateCatDto } from './dto/create-cats.dto';

@Injectable()
export class CatsService {
    constructor(
        @Inject(forwardRef(() => AppService))
        private readonly appService: AppService,
        @InjectModel(Cat.name) private catModel: Model<CatDocument>
    ) { }

    async create(createCatDto: CreateCatDto): Promise<CatModel> {
        try {
            const createdCat = new this.catModel(createCatDto);
            //createdCat.id = uuid();
            return createdCat.save();
        }
        catch (error) {
            throw new NotFoundException("Cound not create cat");
        }
    }

    async findAll() {
        const cats = await this.catModel.find().exec();
        return cats.map((cat) => ({ id: cat._id, name: cat.name, age: cat.age, breed: cat.breed }));
    }

    async findOne(idCat: string): Promise<CatModel> {
        let cat;
        try {
            cat = await this.catModel.findById(idCat);
        }
        catch (error) {
            throw new NotFoundException("Cound not find cat");
        }

        if (!cat) {
            throw new NotFoundException("Cound not find cat");
        }
        return cat;
    }

    async update(updateCatDto: UpdateCatDto): Promise<CatModel> {
        let cat;
        try {
            cat = await this.catModel.findById(updateCatDto.id);

            cat.name = updateCatDto.name;
            cat.age = updateCatDto.age;
            cat.breed = updateCatDto.breed;

            cat.save();
        }
        catch (error) {
            throw new NotFoundException("Cound not find cat");
        }

        if (!cat) {
            throw new NotFoundException("Cound not find cat");
        }

        return cat;
    }

    getHello(): string {
        return this.appService.getHello();
    }
}