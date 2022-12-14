import React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { FaThLarge, FaMicroblog, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const MobileMenu = () => {
  const router = useRouter()
  const linkColor = 'black'
  const activeColor = 'white'
  return (
    <Box bgColor="next-primary" bottom="0px" position="fixed" w="100%" px={6} py={1}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/login">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/login' ? activeColor : linkColor}
          >
            <FaThLarge size={30} />
          </Flex>
        </Link>
        <Link href="/cadastrar">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/cadastrar' ? activeColor : linkColor}
          >
            <FaPlus size={30} />
          </Flex>
        </Link>
        <Link href="/blog">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/blog' ? activeColor : linkColor}
          >
            <FaMicroblog size={30} />
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}
