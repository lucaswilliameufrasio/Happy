import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test'
import faker from 'faker'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const fieldValidationsSpy = [
      new FieldValidationSpy(fieldName),
      new FieldValidationSpy(fieldName)
    ]

    const errorMessage = faker.random.words()
    const sut = new ValidationComposite(fieldValidationsSpy)
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

    expect(error).toBe(errorMessage)
  })
})
