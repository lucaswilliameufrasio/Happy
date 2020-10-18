import path from 'path'

export const getAssetPathHelper = (assetName: string): string => path.join(__dirname, '..', 'assets', assetName)
