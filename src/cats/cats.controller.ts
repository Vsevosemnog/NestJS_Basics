import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, HttpVersionNotSupportedException, Param, Post, Query, Redirect, Req, SetMetadata, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import {  ValidationPipe, ParseIntPipe } from './pipes';
import { AuthGuard } from './guards';
import { Roles } from './decorators';
import { LogginInterceptor, TransformInterceptor, ExcludeNullInterceptor, ErrorsInterceptor, CacheInterceptor } from './interceptors';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
    constructor(
        private readonly catsService: CatsService 
    ) {}

    @Post()
    @Roles('admin')
    //@SetMetadata('roles', ['admin'])
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto ){
        this.catsService.create(createCatDto);
    }

    @Get()
    @UseInterceptors(LogginInterceptor, TransformInterceptor, ExcludeNullInterceptor, ErrorsInterceptor, CacheInterceptor)
    @UseFilters(new HttpExceptionFilter())
    async findAll(): Promise<Cat[]> {
        const result = this.catsService.findAll();
        //console.log(`${result.length}`)
        if (result.length === 0){
            //console.log("Throwing exception")
            throw new HttpException('There`s no cat', HttpStatus.NOT_FOUND);
        }
        //console.log("There`s result output")
        return result;
    }

    @Get(':age')
    @UseFilters(new HttpExceptionFilter())
    async findByAge(@Param('age', new ParseIntPipe()) age : number): Promise<Cat[]> {
        return this.catsService.findByAge(age);
    }

    /*
    @Post()
    //@HttpCode(204)
    @Header('Cache-Control', 'none')
    create(): string {
        return 'this action adds a new cat';
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto)
        return 'This action adds a new cat';
    } 

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

     @Get()
    async findAll(): Promise<any[]> {
        return [];
    } 
    */
    @Get('ab*cd')
    findAllWildcard() {
        return 'This route uses a wildcard';
    }
    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    getDocs(@Query('version') version) {
        if(version && version ==='5'){
            return { url : 'http://docs.nestjs.com/v5/'}
        }
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a ${params.id} cat`;
    }

    /*
    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }
    */



}
