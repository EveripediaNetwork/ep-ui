/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chain,
  Connector,
  ConnectorData,
  normalizeChainId,
  UserRejectedRequestError,
} from 'wagmi'
import { ethers, Signer } from 'ethers'
import { Magic, MagicSDKAdditionalConfiguration } from 'magic-sdk'
import { getAddress } from 'ethers/lib/utils'

const IS_SERVER = typeof window === 'undefined'

interface Options {
  apiKey: string
  opt?: MagicSDKAdditionalConfiguration
}

const MagicLogo = `
<svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5 0C31.1023 3.0212 33.9726 5.82691 37.0764 8.38457C35.0083 14.7429 33.8948 21.4983 33.8948 28.5C33.8948 35.5017 35.0083 42.2571 37.0764 48.6154C33.9726 51.173 31.1023 53.9789 28.5 57C25.8977 53.9789 23.0274 51.173 19.9236 48.6154C21.9917 42.2571 23.1052 35.5017 23.1052 28.5C23.1052 21.4983 21.9917 14.7429 19.9236 8.38459C23.0274 5.82692 25.8977 3.02121 28.5 0Z" fill="#6851FF"/>
<path d="M13.9911 44.2195C10.7057 42.0366 7.21894 40.1076 3.5625 38.4623C4.57677 35.3111 5.12241 31.9659 5.12241 28.5C5.12241 25.0341 4.57677 21.6891 3.5625 18.5377C7.21892 16.8924 10.7057 14.9634 13.9911 12.7806C15.2474 17.827 15.9121 23.0898 15.9121 28.5C15.9121 33.9102 15.2474 39.173 13.9911 44.2195Z" fill="#6851FF"/>
<path d="M41.0879 28.5C41.0879 33.9101 41.7526 39.173 43.0089 44.2195C46.2943 42.0366 49.7811 40.1076 53.4375 38.4623C52.4232 35.3111 51.8776 31.9659 51.8776 28.5C51.8776 25.0341 52.4232 21.6891 53.4375 18.5377C49.7811 16.8924 46.2943 14.9634 43.0089 12.7806C41.7526 17.827 41.0879 23.0898 41.0879 28.5Z" fill="#6851FF"/>
</svg>

`

const modalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
.MagicLink__formOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  z-index: 9999;
}
.MagicLink__formContainer {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  color: black;
  text-align: center;
  gap: 30px;
  align-items: center;
  justify-content: start;
  position: fixed;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(450px, 90%);
  z-index: 9999;
  background-color: white;
  box-shadow: 0 12px 56px rgb(119 118 122 / 15%);
  border-radius: 30px;
  padding: min(80px, 15%);
}

.MagicLink__closeButton {
  position: absolute;
  top: 0;
  right: 10px;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
  font-weight: bold;
  z-index: 9999;
}

.MagicLink__formHeader{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
.MagicLink__logoText{
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.MagicLink__formBody{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
}

.MagicLink__emailLabel{
  font-size: 17px;
  font-weight: 500;
}

.MagicLink__emailInput {
  padding: 10px;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  border: 1px solid #D6D6D6; 
  color: #333;
  font-size: 17px;
  font-weight: 400;
  border-radius: 5px;
}

.MagicLink__emailInput::placeholder { 
  color: #D6D6D6;
  opacity: 1; 
}

.MagicLink__submitButton {
  display: block;
  padding: 8px 30px;
  border: none;
  cursor: pointer;
  color: white;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 12px;
  background-color: #6452f7;
}

`
export class MagicLinkConnector extends Connector<Options, any> {
  ready = !IS_SERVER

  readonly id = 'magiclink'

  readonly name = 'Magic Link'

  provider: any

  magicSDK: Magic | undefined

  isModalOpen = false

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

      // Check if there is a user logged in
      const isAuthenticated = await this.isAuthorized()

      // if there is a user logged in, return the user
      if (isAuthenticated) {
        return {
          provider,
          chain: {
            id: 0,
            unsupported: false,
          },
          account: await this.getAccount(),
        }
      }

      // open the modal and process the magic login steps
      if (!this.isModalOpen) {
        const email = await this.getUserDetailsByForm()
        if (email) {
          const magic = await this.getMagicSDK()
          await magic.auth.loginWithMagicLink({
            email,
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
        }
      }
      throw new UserRejectedRequestError('User rejected request')
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

  async getUserDetailsByForm(): Promise<string> {
    this.isModalOpen = true
    const createForm = async () => {
      // FORM STYLES
      const style = document.createElement('style')
      style.innerHTML = modalStyles
      document.head.appendChild(style)

      // FORM OVERLAY
      const overlay = document.createElement('div')
      overlay.classList.add('MagicLink__formOverlay')

      // FORM CONTAINER
      const formContainer = document.createElement('div')
      formContainer.classList.add('MagicLink__formContainer')
      overlay.appendChild(formContainer)

      // FORM CLOSE BUTTON
      const closeButton = document.createElement('button')
      closeButton.innerHTML = '&times;'
      closeButton.classList.add('MagicLink__closeButton')
      formContainer.appendChild(closeButton)

      // FORM HEADER
      const formHeader = document.createElement('div')
      formHeader.classList.add('MagicLink__formHeader')
      const logo = document.createElement('div')
      logo.innerHTML = MagicLogo
      logo.classList.add('MagicLink__logo')
      const logoText = document.createElement('h1')
      logoText.innerHTML = 'Login by Magic Link '
      logoText.classList.add('MagicLink__logoText')
      formHeader.appendChild(logo)
      formHeader.appendChild(logoText)
      formContainer.appendChild(formHeader)

      // FORM BODY
      const formBody = document.createElement('form')
      formBody.classList.add('MagicLink__formBody')

      // FORM EMAIL LABEL
      const emailLabel = document.createElement('label')
      emailLabel.classList.add('MagicLink__emailLabel')
      emailLabel.innerHTML = 'Sign-in with Email'
      formBody.appendChild(emailLabel)

      // FORM EMAIL INPUT
      const emailInput = document.createElement('input')
      emailInput.classList.add('MagicLink__emailInput')
      emailInput.setAttribute('type', 'email')
      emailInput.setAttribute('placeholder', 'address@example.com')
      formBody.appendChild(emailInput)

      // FORM SUBMIT BUTTON
      const submitButton = document.createElement('button')
      submitButton.textContent = 'Send login link'
      submitButton.classList.add('MagicLink__submitButton')
      submitButton.type = 'submit'
      formBody.appendChild(submitButton)
      formContainer.appendChild(formBody)

      // APPEND FORM TO BODY
      document.body.appendChild(overlay)

      // FORM SUBMIT HANDLER
      return new Promise(resolve => {
        closeButton.addEventListener('click', () => {
          overlay.remove()
          this.isModalOpen = false
          resolve('')
        })
        submitButton.addEventListener('click', () => {
          const email = emailInput.value
          overlay.remove()
          this.isModalOpen = false
          resolve(email)
        })
      })
    }

    const email = await createForm()
    return email as string
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

  protected onAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  protected onChainChanged(chainId: string | number): void {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect(): void {
    this.emit('disconnect')
  }

  async disconnect(): Promise<void> {
    const magic = this.getMagicSDK()
    await magic.user.logout()
  }
}
