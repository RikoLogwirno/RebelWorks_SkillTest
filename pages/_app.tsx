import { ReactElement } from 'react'
import '../styles/main.scss'

export default function App({ Component, pageProps }): ReactElement {
  return <Component {...pageProps} />
}
