import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, HttpVersionNotSupportedException, Param, Post, Query, Redirect, Req, UseFilters } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService 
    ) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto ){
        this.catsService.create(createCatDto);
    }

    @Get()
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