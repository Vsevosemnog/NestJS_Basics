import { Cat } from "./interfaces/cat.interface";
import { Request } from 'express';
export declare class CatsService {
    private request;
    constructor(request: Request);
    private readonly cats;
    create(cat: Cat): void;
    findAll(): Cat[];
    findByAge(age: number): Cat[];
}
