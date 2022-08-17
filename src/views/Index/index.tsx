import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Text
} from '@nextui-org/react'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../../utils/connector'
import { ChainName, ChainId } from '../../types'
import Moralis from 'moralis'

const Index = () => {
  const{ chainId, active, account, activate, deactivate } = useWeb3React()

  const setProvider = (type: string) => {
    window.localStorage.setItem('provider', type)
  }

  const handleConnectWallet = () => {
    activate(connector.injected)
    setProvider('injected')
  }

  const refreshState = () => {
    window.localStorage.setItem('provider', '')
  }

  const handleDisconnectWallet = () => {
    refreshState()
    deactivate()
  }

  const handleClick = async () => {
    console.log('handleClick')
    await Moralis.start({ apiKey: 'mQ6u9hQ0uHuNuE7dazdgYQ8TK70ZXNCStWrJ1V4SPFe9RXnUNFHXM6FJvzQpW4m4' })
    console.log(account)

    if (!account) return

    const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
      address: account,
    })
    console.log(nativeBalance.result.balance.ether)
  }

  return (
    <Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} justify={'center'}>
          <Text
            h1
            size={75}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            NFT-DustBox
          </Text>
        </Grid>
        <Grid xs={6} justify={'center'}>
          {!active ? (
            <Button
              shadow
              color="gradient"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <Card>
              <Card.Body>
                <Text
                  weight="bold"
                  css={{
                    'margin-top': '2px',
                    'margin-bottom': '2px',
                    'text-align': 'center'
                  }}
                >
                  {account}
                </Text>
                <Text
                  weight="bold"
                  css={{
                    'margin-top': '2px',
                    'margin-bottom': '2px',
                    'text-align': 'center'
                  }}
                  color={chainId === ChainId.ETH ? 'success' : 'primary'}
                >
                  {chainId === ChainId.ETH ? ChainName.ETH : ChainName.ETH_TESTNET}
                </Text>
              </Card.Body>
              <Card.Footer>
                <Row justify="center">
                  <Button
                    bordered
                    color="error"
                    onClick={handleDisconnectWallet}
                  >
                    Disconnect
                  </Button>
                  <Button
                    bordered
                    color="error"
                    onClick={handleClick}
                  >
                    Click
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          )}
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default Index
