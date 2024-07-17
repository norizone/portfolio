// 'use client'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useRecoilState, useRecoilValue } from 'recoil'

// import { MainContents } from '@/features/index/components/mainContents/MainContents'
// import { ViewMore } from '../viewMore/ViewMore'
// import { Indicators } from '../indicators/Indicators'
// import styles from './IndexPage.module.scss'
// import { activeWorkState, composeWorksList } from '@/stores/worksStates'
// import { WorkListRes } from '@/types/api/front'
// import { useGetWorkList } from '@/hooks/api/front.hooks'
// import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
// import { useAtom, useAtomValue } from 'jotai'

// type Props = {
//   SSRData: WorkListRes
//   pageSize: number
//   defaultPage: number
// }

// const defaultWork = {

// }

// export const IndexPage = (props: Props) => {
//   const { SSRData, pageSize, defaultPage } = props
//   const [page, setPage] = useState(defaultPage)
//   const viewMoreRef = useRef<HTMLDivElement | null>(null)
//   const [works, setWorks] = useAtom(composeWorksList)
//   const activeIndex = useAtomValue(activeWorkState)
//   const activeWork = useRef<number>(activeIndex)

//   const {
//     data: dataWorkList,
//     isPending: isLoadingWorkList,
//     isError: isErrorWorkList,
//   } = useGetWorkList({ pageSize, page }, SSRData)

//   const onChangePage = () => {
//     if (!dataWorkList) return
//     setPage((prevCount) =>
//       prevCount < dataWorkList?.totalPages
//         ? prevCount + 1
//         : dataWorkList?.totalPages
//     )
//   }

//   useMemo(() => {
//     if (!dataWorkList) return
//     setWorks([...works, ...dataWorkList?.items])
//   }, [dataWorkList])

//   const { handleObserve } = useIntersectionObserver({
//     totalPages: dataWorkList?.totalPages ?? 0,
//     onChangePage,
//     page,
//   })

//   useEffect(() => {
//     if (!viewMoreRef || !viewMoreRef.current) return
//     handleObserve(viewMoreRef)
//   }, [handleObserve, viewMoreRef])

//   return (
//     <div>
//       <div className={styles.index_contents__wrap} id="js-canvasTargetWrap">
//         {works.map((el, index) => (
//           <MainContents
//             contents={el}
//             key={index}
//             contentsIndex={index}
//             isScrollTarget={activeWork.current === index ? true : false}
//           />
//         ))}
//         <ViewMore
//           isLoading={isLoadingWorkList}
//           onChangePage={onChangePage}
//           ref={viewMoreRef}
//           btnHidden={page === Number(dataWorkList?.totalPages)}
//         />
//       </div>
//       {works.length > 1 && <Indicators works={works} />}
//     </div>
//   )
// }
