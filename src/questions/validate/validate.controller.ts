import { Body, Controller, Post } from '@nestjs/common';
import { ValidateService } from './validate.service';
import { ValidateFormDto } from './dto/validate-form.dto';

@Controller('validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post()
  validateForm(@Body() form: ValidateFormDto) {
    return this.validateService.validateForm(form);
  }
}
