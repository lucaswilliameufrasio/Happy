import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export const makeCreateOrphanageValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(2).build(),
    ...Builder.field('about').required().min(4).build(),
    ...Builder.field('whatsapp').required().min(9).build(),
    ...Builder.field('images').required().build(),
    ...Builder.field('instructions').required().min(4).build(),
    ...Builder.field('openingHours').required().build(),
    ...Builder.field('latitude').required().build(),
    ...Builder.field('longitude').required().build()
  ])
}
