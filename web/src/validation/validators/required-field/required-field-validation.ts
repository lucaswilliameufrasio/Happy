import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (typeof input[this.field] && input[this.field]?.length !== undefined) {
      return input[this.field]?.length ? null : new RequiredFieldError()
    }

    return input[this.field] ? null : new RequiredFieldError()
  }
}
