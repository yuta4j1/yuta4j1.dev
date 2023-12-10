import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

type PageObj = {
  idx: number
}

const PagingButton: FC<{ idx: number; isCurrent?: boolean }> = ({
  idx,
  isCurrent = false,
}) => {
  return (
    <button
      className={classNames(
        'bg-blue-100',
        'w-10',
        'h-10',
        'text-blue-500',
        'cursor-pointer',
        'border',
        isCurrent ? 'border-blue-500' : 'border-white',
        'rounded-full',
        'text-center',
        'hover:bg-blue-200',
        'hover:transition-all',
        'duration-150'
      )}
      onClick={() => {}}
    >
      {idx}
    </button>
  )
}

const ArrowButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <button
      className={classNames(
        'w-10',
        'h-10',
        'text-blue-500',
        'rounded-full',
        'flex',
        'justify-center',
        'items-center',
        'hover:bg-gray-100',
        'hover:transition-all',
        'duration-150'
      )}
    >
      {children}
    </button>
  )
}

export const Pagination: FC<{
  currentPageIndex: number
  lastPageIndex: number
}> = ({ currentPageIndex, lastPageIndex }) => {
  const isFirstPage = currentPageIndex === 1
  const isLastPage = currentPageIndex === lastPageIndex
  console.log('lastPageIndex', lastPageIndex)
  const paginationButtons: PageObj[] = Array(lastPageIndex)
    .fill(0)
    .map((_, i) => ({ idx: i + 1 }))

  console.log('paginationButtons', paginationButtons)

  return (
    <div className={classNames('flex', 'justify-center')}>
      <div className={classNames('grid', 'grid-cols-9', 'gap-2')}>
        {!isFirstPage && (
          <>
            <ArrowButton>
              <MdOutlineKeyboardDoubleArrowLeft />
            </ArrowButton>
            <ArrowButton>
              <MdOutlineKeyboardArrowLeft />
            </ArrowButton>
          </>
        )}
        {paginationButtons.map(v => (
          <PagingButton
            key={v.idx}
            idx={v.idx}
            isCurrent={v.idx === currentPageIndex}
          />
        ))}
        {!isLastPage && (
          <>
            <ArrowButton>
              <MdOutlineKeyboardArrowRight />
            </ArrowButton>
            <ArrowButton>
              <MdOutlineKeyboardDoubleArrowRight />
            </ArrowButton>
          </>
        )}
      </div>
    </div>
  )
}
