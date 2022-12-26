import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({path: 'account', host: ':account'})
export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string){
        return account;
    }
}
