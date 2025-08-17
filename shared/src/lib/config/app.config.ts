import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  globalPrefix: '/api',
}));
export type AppConfig = ReturnType<typeof appConfig>;
