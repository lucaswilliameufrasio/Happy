export function getImageFileExtension (fileNameOrUrl: string): string {
  const regexFileExtension = /\.(jpe?g|png|jpg|heic)$/i
  const regexWhiteSpaces = /\s/g

  const match: RegExpMatchArray | null = fileNameOrUrl.replace(regexWhiteSpaces, '').match(regexFileExtension)
  const extension: string = match ? match[1] : ''
  return extension
}

export function getImageFileName (fileUriOrUrl: string): string {
  const regexFileName = /[\w-]+\.(jpg|png|txt)/g
  const regexWhiteSpaces = /\s/g

  const match: RegExpMatchArray | null = fileUriOrUrl.replace(regexWhiteSpaces, '').match(regexFileName)
  const name: string = match ? match[0] : ''
  return name
}
