import { fireEvent, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'

export const simulateSubmit = async (
  sut: RenderResult
): Promise<void> => {
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

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
