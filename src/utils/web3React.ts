import { Web3Provider } from '@ethersproject/providers'

const POLLING_INTERVAL = 12000

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
