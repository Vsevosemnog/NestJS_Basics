import {
    HostComponentInfo,
    ContextId,
    ContextIdFactory,
    ContextIdStrategy,
  } from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;
    let tenantSubTreeId:ContextId;

    if (tenants.has(tenantId)) {
        tenantSubTreeId = tenants.get(tenantId);
    }
    else {
        tenantSubTreeId = ContextIdFactory.create();
        tenants.set(tenantId, tenantSubTreeId);
    }

    // If tree is not durable, return the original "contextId" object
    return (info: HostComponentInfo) =>
    info.isTreeDurable ? tenantSubTreeId : contextId;

    //If you want to register the payload for a durable tree, use the following construction instead:
    /* return {
resolve: (info: HostComponentInfo) => {
const context = info.isTreeDurable ? tenantSubTreeId : contextId;
return context;
},
payload: { tenantId },
} */
}
}