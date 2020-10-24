import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testErrorForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-error`)

  expect(fieldStatus.textContent).toBe(validationError || null)
}

export const populateFilesField = (
  sut: RenderResult,
  fieldName: string,
  files = [faker.random.word()]
): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: {
      files
    }
  })
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}
