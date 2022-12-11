import React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { FaThLarge, FaCog, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MobileMenu = () => {
  const router = useRouter()
  const linkColor = 'black'
  const activeColor = 'white'
  return (
    <Box bgColor="next-primary" bottom="0px" position="fixed" w="100%" px={6} py={1}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/boloes">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/boloes' ? activeColor : linkColor}
          >
            <FaThLarge size={30} />
          </Flex>
        </Link>
        <Link href="/criar-bolao">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/criar-bolao' ? activeColor : linkColor}
          >
            <FaPlus size={30} />
          </Flex>
        </Link>
        <Link href="/settings">
          <Flex
            m={3}
            flexDirection="column"
            alignItems={'center'}
            color={router.pathname === '/settings' ? activeColor : linkColor}
          >
            <FaCog size={30} />
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}

export default MobileMenu
