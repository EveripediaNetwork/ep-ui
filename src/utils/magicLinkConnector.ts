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
import { Magic } from 'magic-sdk'
import { getAddress } from 'ethers/lib/utils'
import { OAuthExtension } from '@magic-ext/oauth'
import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider'

const IS_SERVER = typeof window === 'undefined'

interface Options {
  apiKey: string
  customNodeOptions?: {
    chainId: number
    rpcUrl: string
  }
}

const MagicLogo = `
<svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5 0C31.1023 3.0212 33.9726 5.82691 37.0764 8.38457C35.0083 14.7429 33.8948 21.4983 33.8948 28.5C33.8948 35.5017 35.0083 42.2571 37.0764 48.6154C33.9726 51.173 31.1023 53.9789 28.5 57C25.8977 53.9789 23.0274 51.173 19.9236 48.6154C21.9917 42.2571 23.1052 35.5017 23.1052 28.5C23.1052 21.4983 21.9917 14.7429 19.9236 8.38459C23.0274 5.82692 25.8977 3.02121 28.5 0Z" fill="#6851FF"/>
<path d="M13.9911 44.2195C10.7057 42.0366 7.21894 40.1076 3.5625 38.4623C4.57677 35.3111 5.12241 31.9659 5.12241 28.5C5.12241 25.0341 4.57677 21.6891 3.5625 18.5377C7.21892 16.8924 10.7057 14.9634 13.9911 12.7806C15.2474 17.827 15.9121 23.0898 15.9121 28.5C15.9121 33.9102 15.2474 39.173 13.9911 44.2195Z" fill="#6851FF"/>
<path d="M41.0879 28.5C41.0879 33.9101 41.7526 39.173 43.0089 44.2195C46.2943 42.0366 49.7811 40.1076 53.4375 38.4623C52.4232 35.3111 51.8776 31.9659 51.8776 28.5C51.8776 25.0341 52.4232 21.6891 53.4375 18.5377C49.7811 16.8924 46.2943 14.9634 43.0089 12.7806C41.7526 17.827 41.0879 23.0898 41.0879 28.5Z" fill="#6851FF"/>
</svg>
`
const GoogleLogo = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
<path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
<path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
`
const DiscordLogo = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
<path fill="#536dfe" d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"/>
</svg>
`
const TwitterLogo = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
<path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/>
<path fill="#fff" d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12"/>
</svg>
`
const FacebookLogo = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
<linearGradient id="CXanuwD9EGkBgTn76_1mxa" x1="9.993" x2="40.615" y1="-299.993" y2="-330.615" gradientTransform="matrix(1 0 0 -1 0 -290)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/>
<stop offset="1" stop-color="#007ad9"/>
</linearGradient>
<path fill="url(#CXanuwD9EGkBgTn76_1mxa)" d="M24,4C12.954,4,4,12.954,4,24c0,10.028,7.379,18.331,17.004,19.777	C21.981,43.924,22.982,41,24,41c0.919,0,1.824,2.938,2.711,2.818C36.475,42.495,44,34.127,44,24C44,12.954,35.046,4,24,4z"/>
<path d="M27.707,21.169c0-1.424,0.305-3.121,1.757-3.121h4.283l-0.001-5.617l-0.05-0.852l-0.846-0.114	c-0.608-0.082-1.873-0.253-4.206-0.253c-5.569,0-8.636,3.315-8.636,9.334v2.498H15.06v7.258h4.948V43.6	C21.298,43.861,22.633,44,24,44c1.268,0,2.504-0.131,3.707-0.357V30.301h5.033l1.122-7.258h-6.155V21.169z" opacity=".05"/>
<path d="M27.207,21.169c0-1.353,0.293-3.621,2.257-3.621h3.783V12.46l-0.026-0.44l-0.433-0.059	c-0.597-0.081-1.838-0.249-4.143-0.249c-5.323,0-8.136,3.055-8.136,8.834v2.998H15.56v6.258h4.948v13.874	C21.644,43.876,22.806,44,24,44c1.094,0,2.16-0.112,3.207-0.281V29.801h5.104l0.967-6.258h-6.072V21.169z" opacity=".05"/>
<path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46	c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.475	C21.988,43.923,22.981,44,24,44c0.921,0,1.82-0.062,2.707-0.182V29.301z"/>
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
.MagicLink__oauthButtonsContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
.MagicLink__oauthButton{
  display: block;
  padding: 5px
  border: none;
  cursor: pointer;
  border-radius: 100px;
}
`

interface UserDetails {
  email: string
  isGoogle: boolean
  isDiscord: boolean
  isTwitter: boolean
  isFacebook: boolean
}

export class MagicLinkConnector extends Connector<Options, any> {
  ready = !IS_SERVER

  readonly id = 'magiclink'

  readonly name = 'Magic Link'

  provider: any

  magicSDK: InstanceWithExtensions<SDKBase, OAuthExtension[]> | undefined

  isModalOpen = false

  magicOptions: Options

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: { chains?: Chain[] | undefined; options: Options }) {
    super(config)
    this.magicOptions = config.options
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
        const output = await this.getUserDetailsByForm()
        const magic = await this.getMagicSDK()

        // LOGIN WITH MAGIC LINK WITH GOOGLE
        if (output.isGoogle) {
          await magic.oauth.loginWithRedirect({
            provider: 'google',
            redirectURI: window.location.href,
          })
        }

        // LOGIN WITH MAGIC LINK WITH DISCORD
        if (output.isDiscord) {
          await magic.oauth.loginWithRedirect({
            provider: 'discord',
            redirectURI: window.location.href,
          })
        }

        // LOGIN WITH MAGIC LINK WITH TWITTER
        if (output.isTwitter) {
          await magic.oauth.loginWithRedirect({
            provider: 'twitter',
            redirectURI: window.location.href,
          })
        }

        // LOGIN WITH MAGIC LINK WITH FACEBOOK
        if (output.isFacebook) {
          await magic.oauth.loginWithRedirect({
            provider: 'facebook',
            redirectURI: window.location.href,
          })
        }

        // LOGIN WITH MAGIC LINK WITH EMAIL
        else if (output.email) {
          await magic.auth.loginWithMagicLink({
            email: output.email,
          })
        }

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

  async getUserDetailsByForm(): Promise<UserDetails> {
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
      emailInput.setAttribute('required', 'true')
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

      // FORM OAUTH BUTTONS CONTAINER
      const oauthButtonsContainer = document.createElement('div')
      oauthButtonsContainer.classList.add('MagicLink__oauthButtonsContainer')
      formContainer.appendChild(oauthButtonsContainer)

      // OAUTH BUTTONS
      const providers = [
        { name: 'Google', icon: GoogleLogo },
        { name: 'Discord', icon: DiscordLogo },
        { name: 'Twitter', icon: TwitterLogo },
        { name: 'Facebook', icon: FacebookLogo },
      ]
      providers.forEach(provider => {
        const oauthButton = document.createElement('button')
        oauthButton.classList.add('MagicLink__oauthButton')
        oauthButton.id = `MagicLinkOauth${provider.name}`
        oauthButton.innerHTML = provider.icon
        oauthButton.setAttribute('data-provider', provider.name)
        oauthButtonsContainer.appendChild(oauthButton)
      })

      // APPEND FORM TO BODY
      document.body.appendChild(overlay)

      // FORM SUBMIT HANDLER
      return new Promise(resolve => {
        // for close button
        closeButton.addEventListener('click', () => {
          overlay.remove()
          this.isModalOpen = false
          resolve({ email: '', isGoogle: false, isDiscord: false })
        })

        // for email submit
        submitButton.addEventListener('click', () => {
          const isEmailValid = emailInput.checkValidity()
          if (isEmailValid) {
            const output = {
              email: emailInput.value,
              isGoogle: false,
              isDiscord: false,
            }
            overlay.remove()
            this.isModalOpen = false
            resolve(output)
          }
        })

        // for oauth buttons
        providers.forEach(provider => {
          const oauthButton = document.getElementById(
            `MagicLinkOauth${provider.name}`,
          )
          oauthButton?.addEventListener('click', () => {
            const output = {
              email: '',
              isGoogle: provider.name === 'Google',
              isDiscord: provider.name === 'Discord',
              isTwitter: provider.name === 'Twitter',
              isFacebook: provider.name === 'Facebook',
            }
            overlay.remove()
            this.isModalOpen = false
            resolve(output)
          })
        })
      })
    }

    const output: UserDetails = (await createForm()) as UserDetails
    alert(JSON.stringify(output))
    return output
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

  getMagicSDK(): InstanceWithExtensions<SDKBase, OAuthExtension[]> {
    if (!this.magicSDK) {
      this.magicSDK = new Magic(this.magicOptions.apiKey, {
        network: this.magicOptions.customNodeOptions,
        extensions: [new OAuthExtension()],
      })
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
