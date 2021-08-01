import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import Link from 'next/link'
import { ReactElement, useState } from 'react'

const name = 'Riko logwirno | Skill Test RebelWorks';
const pic_url = 'https://media-exp1.licdn.com/dms/image/C5603AQGGiHCAjZFEzA/profile-displayphoto-shrink_800_800/0/1627034760732?e=1632355200&v=beta&t=8_Z2VIplSkOG4yeaf61r1Y0Uf1OHttXzXsijyRYxpZM';
export const siteTitle = 'Skill Test for RebelWorks'

interface Props {
  children: Array<ReactElement>;
  home?: Boolean;
};

export default function Layout({ children, home }: Props) {
  // document.addEventListener('scroll', () => {
  //   if (window.scrollY >= (document.querySelector('html').scrollHeight - 100))
  //     console.log('REACT ROCK BOTTOM');
  // });
  return (
    <div className={"container-fluid"}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Skill Test for RebelWorks by Riko Logwirno, Build with NextJS"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {home && (
        <header className={"header"}>
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src={pic_url}
                  className={"borderCircle"}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={"headingLg"}>
              <Link href="/">
                <a className={"colorInherit"}>{name}</a>
              </Link>
            </h2>
          </>
        </header>
      )}
      <main>{children}</main>
      {!true && (
        <div className={"backToHome"}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
