import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

type PaginationControlsProps = {
  nextPath: string;
  previousPath: string;
}
const btnStyles = 'px-5 py-3 bg-white/5 flex items-center rounded-md opacity-75 gap-x-2 hover:opacity-100 transition text-sm'
export default function PaginationControls({ nextPath, previousPath }: PaginationControlsProps) {
  return (
    <section className='flex justify-between w-full'>
      {
        previousPath ? <Link href={previousPath} className={btnStyles} >
          <ArrowLeftIcon />
          Prev
        </Link> : <div />
      }
      {
        nextPath && <Link href={nextPath} className={btnStyles}>
          Next<ArrowRightIcon />
        </Link>
      }

    </section >
  )
}
