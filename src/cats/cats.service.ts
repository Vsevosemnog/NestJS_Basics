import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
    findByAge(age: number): Cat[] {
        return this.cats.filter(item => item.age === age);
    }
}