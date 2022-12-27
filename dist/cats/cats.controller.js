"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const create_cat_dto_1 = require("./dto/create-cat.dto");
const cats_service_1 = require("./cats.service");
const http_exception_filter_1 = require("../exception-filters/http-exception.filter");
const pipes_1 = require("./pipes");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    async create(createCatDto) {
        this.catsService.create(createCatDto);
    }
    async findAll() {
        const result = this.catsService.findAll();
        if (result.length === 0) {
            throw new common_1.HttpException('There`s no cat', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async findByAge(age) {
        return this.catsService.findByAge(age);
    }
    findAllWildcard() {
        return 'This route uses a wildcard';
    }
    getDocs(version) {
        if (version && version === '5') {
            return { url: 'http://docs.nestjs.com/v5/' };
        }
    }
    findOne(params) {
        console.log(params.id);
        return `This action returns a ${params.id} cat`;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new pipes_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':age'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('age', new pipes_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findByAge", null);
__decorate([
    (0, common_1.Get)('ab*cd'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "findAllWildcard", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.Redirect)('https://nestjs.com', 301),
    __param(0, (0, common_1.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getDocs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CatsController.prototype, "findOne", null);
CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map