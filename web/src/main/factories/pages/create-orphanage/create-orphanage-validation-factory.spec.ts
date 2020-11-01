import { makeCreateOrphanageValidation } from './create-orphanage-validation-factory'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'

describe('CreateOrphanageValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeCreateOrphanageValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(2).build(),
      ...Builder.field('about').required().min(4).build(),
      ...Builder.field('whatsapp').required().min(9).build(),
      ...Builder.field('images').required().build(),
      ...Builder.field('instructions').required().min(4).build(),
      ...Builder.field('openingHours').required().build(),
      ...Builder.field('position').required().build()
    ]))
  })
})
