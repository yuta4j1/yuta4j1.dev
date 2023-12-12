import type { FC } from 'react'
import classNames from 'classnames'
import { Noto_Sans_JP } from 'next/font/google'
import { FaviconImage } from './FaviconImage'

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

type CardLink = {
  title: string
  hostname: string
  imageUrl: string
  description: string
  faviconUrl: string
}

export const PreviewCard: FC<{
  href: string | undefined
  ogInfo: CardLink
}> = ({ href, ogInfo }) => {
  return (
    <div
      className={classNames(
        notoSansJp.className,
        'rounded-md',
        'border-[1px]',
        'hover:bg-gray-50',
        'hover:transition-all',
        'duration-150'
      )}
    >
      <a className={classNames('flex', 'h-full')} href={href}>
        <div className={classNames('p-4', 'w-3/5', 'flex', 'flex-col')}>
          <h1
            className={classNames(
              'truncate',
              'text-sm',
              'sm:text-sm',
              'md:text-base',
              'lg:text-base'
            )}
          >
            {ogInfo.title}
          </h1>
          <div
            className={classNames(
              'text-sm',
              'text-gray-500',
              'mt-2',
              'truncate',
              'hidden',
              'sm:hidden',
              'md:block',
              'lg:block'
            )}
          >
            {ogInfo.description}
          </div>
          <div className={classNames('flex', 'items-center', 'mt-auto')}>
            <FaviconImage src={ogInfo.faviconUrl} />
            <div className={classNames('text-xs', 'text-gray-600', 'ml-1')}>
              {ogInfo.hostname}
            </div>
          </div>
        </div>
        <img
          className={classNames(
            'ml-auto',
            'rounded-r-md',
            'h-20',
            'w-24',
            'sm:w-auto',
            'sm:h-32',
            'md:h-32',
            'lg:h-32',
            'object-cover',
            'sm:object-fit'
          )}
          src={ogInfo.imageUrl}
          alt="site preview image"
        />
      </a>
    </div>
  )
}
