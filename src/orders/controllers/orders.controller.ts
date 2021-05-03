import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, FilterOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query() params?: FilterOrderDto) {
    return this.ordersService.getAll(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@Body('order') order: CreateOrderDto) {
    return this.ordersService.create(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single order by id' })
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update single order by id' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body('order') order: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, order);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single order by id' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.delete(id);
  }
}
