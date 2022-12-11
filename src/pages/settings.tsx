import {
  Box,
  Container,
  useColorMode,
  Text,
  Flex,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import NextLayout from '../components/templates/NextLayout'
import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/organisms/Footer'
import MobileMenu from '../components/organisms/MobileMenu'
import { SunIcon, MoonIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { translateErrorCode } from '../utils/translateErrorCode'
import * as Sentry from '@sentry/nextjs'

export default function Settings() {
  const { user, authDeleteUser, emailVerification } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleDeleteUser() {
    setIsLoading(true)
    try {
      if (passwordRef) {
        await authDeleteUser(passwordRef.current?.value)
      }
      toast({
        title: 'Estamos tristes 😞',
        description: 'Sua conta foi deletada.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (e) {
      Sentry.captureException(e)
      toast({
        title: 'Tivemos um problema ao deletar o usuário.',
        description: translateErrorCode((e as Error).message),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
    setIsLoading(false)
    onClose()
  }

  async function handleEmailVerification() {
    try {
      await emailVerification()
      toast({
        title: `Email de verificaçao enviado para ${user.email}.`,
        description: 'Verifique também a caixa de spam.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (e) {
      Sentry.captureException(e)
      toast({
        title: 'Tivemos um problema ao enviar o email de verificação.',
        description: translateErrorCode((e as Error).message),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <NextLayout title={'NeXTBolao | Configurações'}>
      <Container display={'flex'} flexDirection={'column'} maxW="container.sm" pb={16} gap={6}>
        <Box>
          {!user?.emailVerified && (
            <Button width={'100%'} colorScheme="green" onClick={() => handleEmailVerification()}>
              Verificar email
            </Button>
          )}
          {user?.emailVerified && (
            <Text colorScheme="green">
              Seu email {user?.email} está verificado <CheckCircleIcon color="green" />
            </Text>
          )}
        </Box>
        <Flex alignItems={'center'}>
          <Button
            width={'100%'}
            colorScheme="green"
            aria-label="Definir tema"
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? (
              <Flex gap={2}>
                <MoonIcon color={'white'} /> Ativar modo escuro
              </Flex>
            ) : (
              <Flex gap={2}>
                <SunIcon color={'black'} /> Desativar modo escuro
              </Flex>
            )}
          </Button>
        </Flex>
        <Box>
          <Button width={'100%'} colorScheme={'red'} onClick={onOpen}>
            Deletar conta
          </Button>
        </Box>
      </Container>
      <Box display={['none', 'block']}>
        <Footer />
      </Box>
      <Box display={['block', 'none']}>
        <MobileMenu />
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar sua conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text pb={2}>
              Tem certeza que quer deletar sua conta? Todas as suas informações serão deletadas!!
            </Text>
            <FormControl>
              <FormLabel>Senha:</FormLabel>
              <Input
                type={'password'}
                ref={passwordRef}
                placeholder="Digite sua senha para confirmar"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              mr={3}
              onClick={() => handleDeleteUser()}
            >
              DELETAR
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </NextLayout>
  )
}
