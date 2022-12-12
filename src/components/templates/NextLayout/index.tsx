import Head from 'next/head'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { NextHeader } from '../../organisms/NextHeader'
import { Box, Button, Center, Container } from '@chakra-ui/react'
import Footer from '../../organisms/Footer'
import MobileMenu from '../../organisms/MobileMenu'
import NextFooter from '../../organisms/NextFooter'
import { layout } from '../../../data'
import { useAuth } from '../../../contexts/AuthContext'

interface NextLayoutProps {
  isLogged?: boolean
  title?: string
  description?: string
  logoSrc?: string
  logoHeight?: number
  logoSubtitle?: string
  logoSubtitleColor?: string
  keywords?: Array<string>
  image?: string
}

export const NextLayout = ({
  isLogged = true,
  children,
  title = layout.title,
  description = layout.description,
  logoSrc = layout.logoSrc,
  logoHeight = layout.logoHeight,
  logoSubtitle = layout.logoSubtitle,
  logoSubtitleColor = layout.logoSubtitleColor,
  keywords = ['bolão'],
  image = 'https://bolao.nextime.com.br/images/image_page.png'
}: PropsWithChildren<NextLayoutProps>) => {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords?.join(', ')} />
        <meta property="og:url" content="https://bolao.nextime.com.br/" />
        <meta property="og:type" content="page" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="NeXTDate" />
        <meta property="article:author" content="NeXTIME" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:image:src" content={image} />
      </Head>

      <NextHeader
        isLogged={isLogged}
        logoSrc={logoSrc}
        logoHeight={logoHeight}
        logoSubtitle={logoSubtitle}
        logoSubtitleColor={logoSubtitleColor}
      />
      {(user || !isLogged) && (
        <Container maxW="container.lg" pt={4} pb={'80px'}>
          <main>{children}</main>
        </Container>
      )}
      {!user && isLogged && (
        <Center height={'50Vh'}>
          <Link href="/login">
            <Button
              color="white"
              bg={'next-primary'}
              _hover={{
                bg: 'next-blue.400',
                color: 'white'
              }}
            >
              Fazer login
            </Button>
          </Link>
        </Center>
      )}
      {!isLogged && <NextFooter />}
      {isLogged && (
        <>
          <Box display={['none', 'block']}>
            <Footer />
          </Box>
          <Box display={['block', 'none']}>
            <MobileMenu />
          </Box>
        </>
      )}
    </>
  )
}
