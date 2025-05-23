
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcError = exception.getError();

    if(typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError && typeof rpcError['status'] === 'number') {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      return response.status(status).json(rpcError);
    }
    
    response.status(400).json(rpcError)

  }
}
