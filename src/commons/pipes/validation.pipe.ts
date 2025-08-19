import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const [error] = Object.values(this.formatErrors(errors)).flat();
            throw new BadRequestException(error);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: ValidationError[]) {
        const result = {};
        errors.forEach(error => {
            if (error.constraints) {
                const firstConstraintKey = Object.keys(error.constraints)[0];
                const firstErrorMessage = error.constraints[firstConstraintKey];
                result[error.property] = [firstErrorMessage];
            }
        });
        return result;
    }
}
