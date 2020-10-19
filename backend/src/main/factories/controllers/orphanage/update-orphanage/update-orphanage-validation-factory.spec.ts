import { makeUpdateOrphanageValidation } from './update-orphanage-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateOrphanage Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateOrphanageValidation()

    const validations: Validation[] = []

    for (const field of [
      'name',
      'latitude',
      'longitude',
      'about',
      'instructions',
      'opening_hours',
      'open_on_weekend',
      'approved',
      'whatsapp'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
