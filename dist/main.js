"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const strategies_1 = require("./strategies");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    core_1.ContextIdFactory.apply(new strategies_1.AggregateByTenantContextIdStrategy());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map