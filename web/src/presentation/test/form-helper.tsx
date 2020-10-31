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
  window.URL.createObjectURL = jest.fn().mockReturnValueOnce(files)

  fireEvent.change(input, {
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

export const testElementDoesNotExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const element = sut.queryByTestId(fieldName)
  expect(element).toBeFalsy()
}

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
