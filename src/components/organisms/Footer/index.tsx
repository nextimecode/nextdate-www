import React from 'react'

import packageInfo from '../../../../package.json'

// chakra-ui
import { Box, Flex, HStack, Link } from '@chakra-ui/react'

import NextimeSvg from '../../atoms/NextimeSvg'

const NeXTIMEColor = '#202F4F'
const version = packageInfo.version

const Footer = () => {
  return (
    <Flex
      bgColor="next-primary"
      color="white"
      fontSize="sm"
      bottom="0px"
      position="fixed"
      w="100%"
      display={['block', 'flex']}
      alignItems="center"
    >
      <Box as="div" w={['100%', '50%']} textAlign="center" py={[3, 4]}>
        Copyright © {new Date().getFullYear()} | NeXTBolao | v.{version}
      </Box>

      <Box as="div" placeContent="center" w={['100%', '50%']} py={[3, 4]}>
        <HStack display="flex" placeContent={['center', 'auto']}>
          <Box as="span">from</Box>
          <Link
            href="https://nextime.com.br"
            _hover={{
              transition: '0.3s',
              fill: NeXTIMEColor
            }}
            transition="0.3s"
            fill="white"
          >
            <NextimeSvg size={1.5} />
          </Link>
        </HStack>
        <Box as="div" display="none">
          Desenvolvedores:
          <Link href="https://github.com/phdduarte">Pedro Duarte</Link>
        </Box>
      </Box>
    </Flex>
  )
}

export default Footer
