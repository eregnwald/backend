import { NestMiddleware } from '@nestjs/common';
export declare class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any;
}
