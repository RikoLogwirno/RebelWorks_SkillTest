import { parseISO, format } from 'date-fns'
import { ReactElement } from 'react'

export default function Date({ dateString }): ReactElement {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
