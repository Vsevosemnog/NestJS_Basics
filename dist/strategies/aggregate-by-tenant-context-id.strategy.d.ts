import { HostComponentInfo, ContextId, ContextIdStrategy } from '@nestjs/core';
import { Request } from 'express';
export declare class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
    attach(contextId: ContextId, request: Request): (info: HostComponentInfo) => ContextId;
}
