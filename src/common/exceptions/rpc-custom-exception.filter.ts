
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcError = exception.getError();


    if(rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
      })
    }

    if(
      typeof rpcError === 'object' && 
      'status' in rpcError && 
      'message' in rpcError 
     ) {
      const statusError: any = rpcError.status;
      const status = isNaN(+statusError) ? 400 : +statusError;
      return response.status(status).json(rpcError);
    }
    
    response.status(400).json({
      status: 400,
      message: rpcError
    })

  }
}
