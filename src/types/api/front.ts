import { Work } from "@prisma/client"

export type ResWorkList = Pick<Work , 'id'|'archiveImg'|'titleEn'> & {
  useTools : string[]
}

export type WorkDetail = Work & {
  useTools : string[]
}

export type NextWork = Pick<Work ,'id'|'titleEn'>

export type ResWorkDetail = {
  item:WorkDetail,
  nextContents?:NextWork
}