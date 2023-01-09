import { Injectable, Inject, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({scope: Scope.REQUEST, durable: true})
export class HelloServiceService {
    constructor(@Inject(INQUIRER) private parentClass: object) {}

    sayHello(message:string) {
        console.log(`${this.parentClass?.constructor?.name}:${message}`);
    }
}
