import * as common from '@nestjs/common';

@common.Injectable()
export class DynamicValidationPipe implements common.PipeTransform {
  private readonly inner: common.ValidationPipe;

  constructor(
    private readonly metatype: common.Type<any>,
    options: common.ValidationPipeOptions = {}
  ) {
    this.inner = new common.ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      ...options,
    });
  }

  transform(value: any, metadata: common.ArgumentMetadata) {
    return this.inner.transform(value, {
      ...metadata,
      metatype: this.metatype,
    });
  }
}
