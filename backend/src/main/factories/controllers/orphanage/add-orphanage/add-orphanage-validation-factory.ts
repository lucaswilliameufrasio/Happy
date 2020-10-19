import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddOrphanageValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of [
    'name',
    'latitude',
    'longitude',
    'about',
    'instructions',
    'opening_hours',
    'open_on_weekend',
    'whatsapp',
    'images'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
