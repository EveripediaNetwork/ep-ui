/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chain,
  Connector,
  ConnectorData,
  UserRejectedRequestError,
} from 'wagmi'
import { ethers, Signer } from 'ethers'
import { Magic, MagicSDKAdditionalConfiguration } from 'magic-sdk'

const IS_SERVER = typeof window === 'undefined'

interface Options {
  apiKey: string
  opt?: MagicSDKAdditionalConfiguration
}

export class MagicLinkConnector extends Connector<Options, any> {
  ready = !IS_SERVER

  readonly id = 'magiclink'

  readonly name = 'Magic Link'

  provider: any

  magicSDK: Magic | undefined

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: { chains?: Chain[] | undefined; options: Options }) {
    super(config)
  }

  async connect(): Promise<ConnectorData<any>> {
    try {
      const provider = await this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      const magic = await this.getMagicSDK()
      await magic.auth.loginWithMagicLink({
        email: 'srujangs8@gmail.com',
      })
      const signer = await this.getSigner()
      const account = await signer.getAddress()
      return {
        account,
        chain: {
          id: 0,
          unsupported: false,
        },
        provider,
      }
    } catch (error) {
      throw new UserRejectedRequestError()
    }
  }

  async getAccount(): Promise<string> {
    const provider = new ethers.providers.Web3Provider(this.getProvider())
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    return account
  }

  getProvider() {
    if (this.provider) {
      return this.provider
    }
    const magic = this.getMagicSDK()
    this.provider = magic.rpcProvider
    return this.provider
  }

  async getSigner(): Promise<Signer> {
    const provider = new ethers.providers.Web3Provider(this.getProvider())
    const signer = await provider.getSigner()
    return signer
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  getMagicSDK(): Magic {
    if (!this.magicSDK) {
      this.magicSDK = new Magic(this.options.apiKey, this.options.opt)
      return this.magicSDK
    }
    return this.magicSDK
  }

  async getChainId(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  protected onAccountsChanged(_accounts: string[]): void {
    throw new Error('Method not implemented.')
  }

  protected onChainChanged(_chain: string | number): void {
    throw new Error('Method not implemented.')
  }

  protected onDisconnect(): void {
    throw new Error('Method not implemented.')
  }

  async disconnect(): Promise<void> {
    const magic = this.getMagicSDK()
    await magic.user.logout()
  }
}
