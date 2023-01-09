import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { REQUEST } from '@nestjs/core';
import {Request} from 'express';

@Injectable({scope: Scope.REQUEST})
/* 
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
} */
export class CatsService {
    constructor(@Inject(REQUEST) private request: Request) {}

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