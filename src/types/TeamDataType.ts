export type TeamDataType = Array<TeamObjDataType>
type TeamObjDataType = {
  image: string
  name: string
  about: string
  title: string
  socials: {
    iqWiki?: string
    facebook?: string
    github?: string
    instagram?: string
    linkedin?: string
    twitter?: string
    youtube?: string
  }
}
