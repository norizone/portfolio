import { useMutateWorkList } from '@/hooks/api/front.hooks'
import { composeWorksList, loadedPage } from '@/stores/worksStates'
import { useAtom } from 'jotai'

export const useChangePage = ({
  pageSize,
  totalPages,
}: {
  pageSize: number
  totalPages: number
}) => {
  const [works, setWorks] = useAtom(composeWorksList)
  const [currentPage, setCurrentPage] = useAtom(loadedPage)
  const { mutate: mutateWorkList, isPending: isLoadingWorkList } =
    useMutateWorkList()

  const handleChangePage = (getPage: number) => {
    mutateWorkList(
      {
        page: getPage,
        pageSize,
      },
      {
        onSuccess: (res) => {
          const currentIds = new Set(works.map((work) => work.id))
          const newWorks = res.items.filter((item) => !currentIds.has(item.id))
          setWorks((prev) => {
            return [...prev, ...newWorks]
          })
        },
        onError: (error) => {
          console.log(error)
        },
      }
    )
  }

  const onChangePage = () => {
    if (currentPage >= totalPages) return
    const newValue = currentPage + 1
    setCurrentPage(newValue)
    handleChangePage(newValue)
  }

  return {
    onChangePage,
    isLoadingWorkList,
  }
}
