import { Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName] && !(typeof input[this.fieldName] === 'boolean')) {
      return new MissingParamError(this.fieldName)
    }
  }
}
