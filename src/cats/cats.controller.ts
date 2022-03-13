import {
    Controller, Get, Query, Post, Body, Param, HttpStatus, ForbiddenException, UseFilters,
    ParseIntPipe, UsePipes, HttpCode, ValidationPipe, UseGuards, Scope
}
    from '@nestjs/common';

import { ApiBadGatewayResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auths/guards/roles.guard';
import { Roles } from 'src/auths/roles/roles.decorator';

import { HttpExceptionFilter } from 'src/helper/http-exception.filter';

import { ValidationPipeB } from 'src/pipes/validation.pipe';

import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/create-cats.dto';
import { Cat } from './interfaces/cat.interface';


@Controller({
    path: 'cats',
    scope: Scope.REQUEST,
})
@UseGuards(RolesGuard)
// @UsePipes(new ValidationPipe({
//     whitelist: true,
//     transform: true
// }))
//@UseInterceptors(new TimeoutInterceptor())
export class CatsController {
    constructor(private catsService: CatsService) { }

    // @Post()
    // create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    @Get()
    @UseFilters(new HttpExceptionFilter())
    async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
        throw new ForbiddenException('abc');
    }

    @Get('list-all')
    @ApiTags('Cat')
    @ApiOperation({ description: "get all cat" })
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'OK' })
    @ApiBadGatewayResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({ description: 'data has been fetched successfully' })
    @Roles('admin')
    async listAll() {
        return await this.catsService.findAll();
    }

    // @Get(':id')
    // async findOne(
    //     @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    //     id: number,
    // ) {

    //     return `${await this.catsService.getHello()} ${id}`;
    // }

    @Get(':id')
    async findOne(@Param() params): Promise<Cat> {
        return await this.catsService.findOne(params.id);
    }

    @Post('create-cat')
    @ApiTags('Cat')
    @ApiOperation({ description: "" })
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }))
    @Roles('admin')
    async createCat(@Body(new ValidationPipeB()) createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }

    @Post('update-cat')
    @ApiTags('Cat')
    @ApiOperation({ description: "" })
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }))
    @Roles('admin')
    update(@Body(new ValidationPipeB()) updateCatDto: UpdateCatDto) {
        return this.catsService.update(updateCatDto);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return `This action removes a #${id} cat`;
    // }
}