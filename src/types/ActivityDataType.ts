export type ActivityDataType = Array<ActivityObjType>
type ActivityObjType = {
  wikiImg: string
  title: string
  brief: string
  editor: string
  wordsChanged: number
  percentChanged: number
  isFirstEdit: boolean
  lastModTimeStamp: string
}
