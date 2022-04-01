import { PageType, PageTypeName } from '@/types/Wiki'

export const PageTemplate: Array<PageType> = [
  {
    type: PageTypeName.PERSON,
    templateText: `# Person name\n**Person_name** (born 01/01/1900) is a ...\n## Career\n**Person_name** started his/her career at ...\n## Personal\nHe/she was born in ...\n## Trivia\nHe/She likes to ...`,
  },
  {
    type: PageTypeName.PLACE_LOCATION,
    templateText: `# Place name\n**Place_name** is a place ...\n## History\n**Place_name** is known for ...\n## Features\n**Place_name** offers ...`,
  },
  {
    type: PageTypeName.ORGANIZATION_COMPANY_INSTITUTION,
    templateText: `# Organization name\n**Organization name** (founded 01/01/1900) is a ...\n## History\n**Organization name** was started by ...\n## Services\n**Organization name** offers ...`,
  },
  {
    type: PageTypeName.EVENT,
    templateText: `# Event name\n**Event name** is an event that was first started on 01/01/1900 ...\n## History\n**Event name** was formed by ...\n## Features\n**Event name** offers ...`,
  },
  {
    type: PageTypeName.LIST_RANKING,
    templateText: `# List / Ranking\nStart creating content for this article here...`,
  },
  {
    type: PageTypeName.PRODUCT_MERCHANDISE,
    templateText: `## Product name\n**Product name** is product created on 01/01/1900\n## History\n**Product name** was created by ...\n## Features\nFeatures of **product name** include ...`,
  },
  {
    type: PageTypeName.CREATIVE_WORK_ART,
    templateText: `# Creative work name\n**Creative work name** is work that was created on 01/01/1900\n## History\n**Creative work name** was created by ...\n## Features\nFeatures include ...`,
  },
  {
    type: PageTypeName.OTHER,
    templateText: `# Other\nStart creating content for this article here...
    `,
  },
]
