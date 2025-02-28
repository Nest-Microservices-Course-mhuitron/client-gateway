import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `status must be a valid enum value: ${OrderStatusList}`
    })
    status: OrderStatus;    
}