import axios from 'axios'
import formidable from 'formidable'
import * as fs from 'fs'
import * as FormData from 'form-data'

const pinImageToPinata = async (req: any): Promise<string> => {
  const form = new formidable.IncomingForm()
  form.uploadDir = './'
  form.keepExtensions = true

  const formFields = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ fields, files })
    })
  })
  const formFiles = new FormData()
  const file = await fs.createReadStream(formFields.files.file.filepath)
  formFiles.append('file', file, encodeURI(formFields.fields.name))
  // formFiles.append('pinataMetadata', { name: formFields.fields.name })
  const resp = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formFiles,
    {
      headers: {
        ...formFiles.getHeaders(),
        pinata_api_key: process.env.PINATA_KEY || '',
        pinata_secret_api_key: process.env.PINATA_SECRET || '',
      },
    },
  )

  const data = resp.data as {
    IpfsHash: string
    PinSize: number
    Timestamp: string
  }
  return data.IpfsHash
}

export default async (req: any, res: any) => {
  const IpfsHash = await pinImageToPinata(req)
  res.status(200).json({ ipfs: IpfsHash })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
