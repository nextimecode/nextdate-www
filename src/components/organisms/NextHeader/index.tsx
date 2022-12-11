import * as Sentry from '@sentry/nextjs'
import Image from 'next/image'
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Container,
  Button,
  useToast,
  useColorModeValue,
  HStack,
  useColorMode
} from '@chakra-ui/react'
import { ChevronRightIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { NavItem } from '../../../types/LandingPageItems'
import { useAuth } from '../../../contexts/AuthContext'
import { translateErrorCode } from '../../../utils/translateErrorCode'
import { useRouter } from 'next/router'
import { LogoNext } from '../../atoms/logoNext'
import colors from '../../../theme/colors'
import Link from 'next/link'

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: 'gray.900' }}>
      <Link href={href}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </Box>
  )
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog'
  }
]

const DesktopNav = ({ navItems = NAV_ITEMS }: Props) => {
  const router = useRouter()
  const linkColor = useColorModeValue('black', 'white')
  const linkHoverColor = 'next-primary'
  const popoverContentBgColor = 'gray.800'

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link href={navItem.href ?? '#'}>
                <Button
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={router.pathname === navItem.href ? linkHoverColor : linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor
                  }}
                >
                  {navItem.label}
                </Button>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const NAV_ITEMS_LOGGED: Array<NavItem> = [
  {
    label: 'Bolões',
    href: '/boloes'
  },
  {
    label: 'Criar Bolao',
    href: '/criar-bolao'
  },
  {
    label: 'Configurações',
    href: '/settings'
  }
]

type Props = {
  isLogged?: boolean
  navItems?: Array<NavItem>
  logoSrc?: string
  logoWidth?: number
  logoHeight?: number
  logoAlt?: string
  logoSubtitle?: string
  logoSubtitleColor?: string
}

const NextHeader = ({
  isLogged = true,
  logoSrc = '/images/logos/logo_nextime.svg',
  logoWidth = 106,
  logoHeight = 45,
  logoAlt = 'NeXTIME Logo',
  logoSubtitle,
  logoSubtitleColor = 'next-blue.400'
}: Props) => {
  const navItems = isLogged ? NAV_ITEMS_LOGGED : NAV_ITEMS
  const router = useRouter()
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logout } = useAuth()
  let buttonText
  if (user && !(router.pathname === '/') && !router.pathname.includes('blog')) {
    buttonText = 'SAIR'
  } else {
    buttonText = 'LOGIN'
  }
  async function handleLogout() {
    try {
      await logout()
    } catch (e) {
      Sentry.captureException(e)
      toast({
        title: 'Tivemos um problema.',
        description: translateErrorCode((e as Error).message),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  function handleSubmit() {
    if (user && !(router.pathname === '/') && !router.pathname.includes('blog')) {
      handleLogout()
    } else {
      router.push('/login')
    }
  }
  const logoColor = useColorModeValue('black', 'white')
  const buttonBgColor = useColorModeValue('gray.300', 'gray.700')
  return (
    <Box borderBottom={1} borderStyle={'solid'} borderColor={'next-primary'}>
      <Container maxW="container.lg">
        <Flex color={'gray.600'} minH={'70px'} align={'center'}>
          <Link href={'/'}>
            <Flex justify={{ base: 'center' }} alignItems={'center'}>
              {logoSrc === '/images/logos/logo_nextime.svg' && (
                <Image src={logoSrc} alt={logoAlt} width={logoWidth} height={logoHeight} />
              )}
              {logoSrc === '/images/logos/next.svg' && (
                <LogoNext colorPrimary={colors['next-primary']} color={logoColor} />
              )}
              {logoSubtitle && (
                <Box ms={2} px={2} borderLeft={'4px'} borderColor="next-primary">
                  <Text fontSize={{ base: 'lg', lg: 'xl' }} color={logoSubtitleColor}>
                    {logoSubtitle}
                  </Text>
                </Box>
              )}
            </Flex>
          </Link>
          <HStack flex={{ base: 1 }} gap={1} justify={{ base: 'end' }} alignItems={'center'}>
            <Flex display={{ base: 'none', sm: 'flex' }} me={4}>
              <DesktopNav navItems={navItems} />
            </Flex>
            <Button bg={buttonBgColor} aria-label="Definir tema" onClick={toggleColorMode}>
              {colorMode === 'light' ? (
                <Flex gap={2}>
                  <MoonIcon color={'black'} />
                </Flex>
              ) : (
                <Flex gap={2}>
                  <SunIcon color={'white'} />
                </Flex>
              )}
            </Button>
            <Button
              bg={'next-primary'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
              onClick={() => handleSubmit()}
            >
              {buttonText}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default NextHeader
