import { usePagination, DOTS } from '@/shared/hooks'
import clsx from 'clsx'

const Pagination = ({
  onPageChange,
  totalCount = 1,
  siblingCount = 1,
  currentPage = 1,
  pageSize = 10,
  className
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  const lastPage = paginationRange[paginationRange?.length - 1]

  const onNext = () => {
    if (currentPage === lastPage) {
      return
    }
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage === 1) {
      return
    }
    onPageChange(currentPage - 1)
  }
  return (
    <div>
      <div className="h-[1px] w-full bg-lightgray opacity-25" />
      <div className="flex justify-between items-center">
        <div className={clsx('flex items-center text-sm text-lightgray', { ['pointer-events-none']: currentPage === 1 })} onClick={onPrevious}>
          <svg className="mr-3" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5948 15.2266C8.20428 15.6172 7.57111 15.6172 7.18059 15.2266L3.18059 11.2266C2.79006 10.8361 2.79006 10.2029 3.18059 9.81243L7.18059 5.81242C7.57111 5.4219 8.20428 5.4219 8.5948 5.81242C8.98533 6.20295 8.98533 6.83611 8.5948 7.22664L6.30191 9.51953L17.8877 9.51953C18.44 9.51953 18.8877 9.96725 18.8877 10.5195C18.8877 11.0718 18.44 11.5195 17.8877 11.5195L6.30191 11.5195L8.5948 13.8124C8.98533 14.2029 8.98533 14.8361 8.5948 15.2266Z" fill="#9CA3AF"/>
          </svg>
          Предыдущий
        </div>
        <ul
          className={clsx('flex items-center list-none', className)}
        >
          {paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <li key={pageNumber} className="pagination-item dots">&#8230</li>
            }
            return (
              <li
                key={pageNumber}
                className={clsx('relative w-[40px] h-[38px] flex flex-col items-center justify-center text-sm leading-5 font-medium cursor-pointer before:w-full before:h-[2px] before:absolute before:top-0 before:left-0', {
                  ['text-[#4F46E5] before:bg-[#4F46E5]']: Number(pageNumber) === Number(currentPage),
                  ['text-[#6B7280]']: Number(pageNumber) != Number(currentPage)
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            )
          })}
        </ul>
        <div className={clsx('flex items-center text-sm text-lightgray', { ['pointer-events-none']: currentPage === lastPage })} onClick={onNext}>
          Следующий
          <svg className="ml-3" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1806 5.81242C13.5711 5.4219 14.2043 5.4219 14.5948 5.81242L18.5948 9.81242C18.9853 10.2029 18.9853 10.8361 18.5948 11.2266L14.5948 15.2266C14.2043 15.6172 13.5711 15.6172 13.1806 15.2266C12.7901 14.8361 12.7901 14.2029 13.1806 13.8124L15.4735 11.5195H3.8877C3.33541 11.5195 2.8877 11.0718 2.8877 10.5195C2.8877 9.96725 3.33541 9.51953 3.8877 9.51953H15.4735L13.1806 7.22664C12.7901 6.83611 12.7901 6.20295 13.1806 5.81242Z" fill="#9CA3AF"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Pagination