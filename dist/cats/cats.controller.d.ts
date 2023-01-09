import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    create(createCatDto: CreateCatDto): Promise<void>;
    findAll(): Promise<Cat[]>;
    findByAge(age: number): Promise<Cat[]>;
    findAllWildcard(): string;
    getDocs(version: any): {
        url: string;
    };
    findOne(params: any): string;
}
