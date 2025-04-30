import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post() 
  createProduct(@Body() body: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, body)
      .pipe(
        catchError(err => {throw new RpcException(err)})
      )
  }

  @Get() 
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'final_all_products' }, paginationDto);
  }

  @Get(':id') 
  async findProductById(@Param('id') id: string) {
    return this.client.send( { cmd: 'find_one_product' }, { id } )
      .pipe(
        catchError(err => {throw new RpcException(err)})
      )
  }

  @Delete(':id') 
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_product' }, {id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Patch(':id') 
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.client.send({ cmd: 'update_product' }, {...body, id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }
}
