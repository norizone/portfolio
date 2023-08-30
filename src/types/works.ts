export type WorksImg = {
  url: string;
  height: number;
  width: number;
}

export type WorksContent = {
  id: string;
  createdAt: string|'2022-07-05T08:15:57.111Z';
  updatedAt: string|'2022-07-23T00:58:05.088Z';
  publishedAt: string|'2022-07-05T08:37:53.325Z';
  revisedAt: string|'2022-07-23T00:58:05.088Z';
  title: string;
  title_en: string;
  archive_img: {
    url: string;
    height: number;
    width: number;
  },
  use_tools: Array<string>;
  comment?: string;
  url?: string;
  git_url?: string;
  creation_date:string| '2022-07-04T15:00:00.000Z',
  role?: string;
  single_img_pc: WorksImg,
  single_img_sp_1: WorksImg,
  single_img_sp_2: WorksImg,
  no_referrer:boolean
}

export type Works = {
  contents: [
    WorksContent
  ],
  totalCount: 1
}

export type ListWorksContents = Pick<WorksContent,'id'|'title_en'|'archive_img'|'use_tools'>

export type ListWorks = {
  contents:[
    ListWorksContents
  ],
  totalCount: number;
  offset: number;
  limit: number;
}
