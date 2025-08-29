import { Controller, Get } from '@nestjs/common';

@Controller('health') // 👈 SIN prefijo completo
export class HealthController {
  @Get()
  ping() { return { status: 'ok' }; }
}
