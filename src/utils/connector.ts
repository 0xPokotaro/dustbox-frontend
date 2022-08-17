import { InjectedConnector } from '@web3-react/injected-connector'
import { ChainId } from '../types'

const injected = new InjectedConnector({
  supportedChainIds: [ChainId.ETH, ChainId.ETH_TESTNET],
})

export const connector = {
  injected: injected,
}
