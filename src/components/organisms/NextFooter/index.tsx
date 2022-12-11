import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Box, Container, Grid, GridItem, Heading, HStack, Icon, Text } from '@chakra-ui/react'

import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaMailBulk,
  FaYoutube,
  FaFacebookMessenger
} from 'react-icons/fa'

export type NextFooterProps = {
  bg?: 'next-primary' | undefined
}

const NextFooter = ({ bg = 'next-primary' }: NextFooterProps) => {
  return (
    <footer>
      <Box bg={bg} pt={12} pb={12}>
        <Grid templateColumns="repeat(5, 2fr)">
          <GridItem colSpan={[1, 3]}>
            <Container maxW="2xl">
              <Box>
                <Heading fontWeight={600} color="white">
                  Fale com a gente:
                </Heading>
                <HStack spacing={6} pt={4} pb={10}>
                  <Link
                    href={
                      'mailto:contato@nextime.com.br?subject=Orçamento para NeXTIME&body=Olá,%20NeXTIME'
                    }
                    target={'_blank'}
                  >
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaMailBulk}
                      w={16}
                      h={16}
                    />
                  </Link>
                  <Link
                    href={
                      'https://api.whatsapp.com/send?phone=5511972436305&text=Ol%C3%A1,%20Pedro!%0AGostaria%20de%20participar%20da%20mentoria.'
                    }
                    target={'_blank'}
                  >
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaWhatsapp}
                      w={16}
                      h={16}
                    />
                  </Link>
                  <Link href={'https://m.me/102621504903865'} target={'_blank'}>
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaFacebookMessenger}
                      w={16}
                      h={16}
                    />
                  </Link>
                  <Link href={'https://www.instagram.com/nextimetec/'}>
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaInstagram}
                      w={16}
                      h={16}
                    />
                  </Link>
                </HStack>
                <HStack spacing={6} pt={3} pb={12}>
                  <Link href={'https://www.nextime.com.br/'}>
                    <Box pe={6} pt={2}>
                      <Text fontSize="sm" color={'white'}>
                        from
                      </Text>
                      <Image
                        src="/images/logos/nextime_logo_white.svg"
                        alt="NeXTIME Logo"
                        width={146}
                        height={46}
                      />
                    </Box>
                  </Link>
                  <Link href={'https://www.linkedin.com/company/nextimetec/'}>
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaLinkedinIn}
                      w={8}
                      h={8}
                    />
                  </Link>
                  <Link href={'https://www.youtube.com/channel/UC1hFKnbaZ2dvmdYSDbRgVsA'}>
                    <Icon
                      color="white"
                      _hover={{ color: 'next-dark' }}
                      as={FaYoutube}
                      w={8}
                      h={8}
                    />
                  </Link>
                </HStack>
              </Box>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </footer>
  )
}

export default NextFooter
