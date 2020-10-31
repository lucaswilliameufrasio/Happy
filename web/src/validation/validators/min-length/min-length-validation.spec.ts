import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field)

describe('MinLengthValidation', () => {
  test('Should return error if value length is lesser than the specified', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(error).toEqual(new InvalidFieldError())
  })
})
