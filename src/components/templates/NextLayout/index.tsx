import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import { NextHeader } from '../../organisms/NextHeader'
import NextFooter from '../../organisms/NextFooter'
import { layout } from '../../../data'

interface NextLayoutProps {
  title?: string
  url?: string
  description?: string
  logoSrc?: string
  logoHeight?: number
  logoSubtitle?: string
  logoSubtitleColor?: string
  keywords?: Array<string>
  image?: string
  siteName?: string
}

export const NextLayout = ({
  title = layout.title,
  url = layout.url,
  description = layout.description,
  logoSrc = layout.logoSrc,
  logoHeight = layout.logoHeight,
  logoSubtitle = layout.logoSubtitle,
  logoSubtitleColor = layout.logoSubtitleColor,
  keywords = [''],
  image = `${url}/images/image_page.png`,
  siteName = layout.siteName,
  children
}: PropsWithChildren<NextLayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords?.join(', ')} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="page" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteName} />
        <meta property="article:author" content={siteName} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:image:src" content={image} />
      </Head>
      <NextHeader
        logoSrc={logoSrc}
        logoHeight={logoHeight}
        logoSubtitle={logoSubtitle}
        logoSubtitleColor={logoSubtitleColor}
      />
      <main>{children}</main>
      <NextFooter />
    </>
  )
}
