import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  Checkbox
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../contexts/AuthContext'
import * as z from 'zod'
import { translateErrorCode } from '../../../utils/translateErrorCode'
import api from '../../../services/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ShortUniqueId from 'short-unique-id'
import * as Sentry from '@sentry/nextjs'
import { User } from '../../../types/User'

const searchFormSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  wantReceiveEmail: z.boolean(),
  phoneNumber: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export default function NextTemplateSignup() {
  const idInvitation = new ShortUniqueId({ length: 5, dictionary: 'number' })
  const router = useRouter()
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const color = useColorModeValue('black', 'white')
  const bgBox = useColorModeValue('white', 'gray.700')
  const { user, signup, updateUser } = useAuth()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })
  async function handleSignup(data: SearchFormInputs) {
    try {
      const idWhoInvited = await localStorage.getItem('idWhoInvited')
      const response = await signup(data.email, data.password)
      await updateUser(response.user, data.name)
      const fullName = data.name.split(' ')
      const firstName = fullName[0]
      const lastName = fullName[fullName.length - 1]
      const myInvitationId = `${firstName.toLowerCase()}-${idInvitation()}`
      const newUser: User = {
        email: response?.user?.email,
        hasSentEmail: false,
        avatarUrl: '',
        name: response?.user?.displayName,
        wantReceiveEmail: data.wantReceiveEmail,
        uid: response?.user?.uid,
        phoneNumber: data.phoneNumber,
        invitation: idWhoInvited,
        myInvitationId,
        firstName,
        lastName,
        participatingAt: [],
        ownPools: [],
        guess: []
      }
      await api.post('/users', newUser, {
        headers: {
          Authorization: response.user.accessToken
        }
      })
      const userInfoMailer = {
        email: response?.user?.email,
        fields: {
          name: firstName,
          last_name: lastName
        },
        groups: ['70617232662595162']
      }
      await api.post('mailer', userInfoMailer)
      toast({
        title: 'Sucesso',
        description: 'Sua conta foi criada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
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
  if (user) {
    router.push('./boloes')
    return <></>
  } else {
    return (
      <>
        <Head>
          <title>NeXTBolao | Cadastro</title>
        </Head>
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={bgColor} color={color}>
          <Stack spacing={4} mx={'auto'} maxW={'lg'} pt={6} pb={1} px={1}>
            <Stack align={'center'} textAlign="center">
              <Link href="/">
                <Text as="span" fontSize={'lg'} color={'next-blue.400'} decoration={'underline'}>
                  Voltar para o site
                </Text>
              </Link>
              <Heading as="h1" fontSize={'xl'}>
                Crie a sua conta no NeXTBolao
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Já tem uma conta?{' '}
                <Link href="/login">
                  <Text as="span" fontSize={'lg'} color={'next-primary'}>
                    ENTRE
                  </Text>
                </Link>
                👉
              </Text>
            </Stack>
            <Box minW="350px" rounded={'lg'} bg={bgBox} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Digite seu nome completo"
                    {...register('name')}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    type="email"
                    id="emailAddress"
                    aria-describedby="email-helper-text"
                    placeholder="Digite seu email"
                    {...register('email')}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Digite uma senha"
                    {...register('password')}
                  />
                </FormControl>
                <FormControl id="phoneNumber">
                  <FormLabel htmlFor="phoneNumber">Whatsapp</FormLabel>
                  <Input
                    type="number"
                    id="phoneNumber"
                    placeholder="+55(00) 0 0000-0000"
                    {...register('phoneNumber')}
                  />
                </FormControl>
                <Text fontSize="xs">
                  Ao enviar este formulário: Você concorda com o processamento dos dados pessoais
                  submetidos de acordo com a{' '}
                  <Link href={'/politicas_de_privacidade.pdf'} target={'_blank'}>
                    <Text as={'span'} decoration={'underline'} color={'next-blue.400'}>
                      Política de Privacidade
                    </Text>
                  </Link>{' '}
                  e com os{' '}
                  <Link href={'/politicas_de_privacidade.pdf'} target={'_blank'}>
                    <Text as={'span'} decoration={'underline'} color={'next-blue.400'}>
                      Termos de Uso
                    </Text>
                  </Link>{' '}
                  do aplicativo NeXTBolao.
                </Text>
                <FormControl id="wantReceiveEmail">
                  <Checkbox
                    id="wantReceiveEmail"
                    colorScheme="orange"
                    defaultChecked
                    {...register('wantReceiveEmail')}
                  >
                    <Text fontSize="xs">
                      Você concorda em receber informações do NeXTBolao relacionadas a nossos
                      serviços, eventos e promoções. Você pode cancelar sua inscrição a qualquer
                      momento, seguindo as instruções nas comunicações recebidas.
                    </Text>
                  </Checkbox>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link href="/recuperar-senha">
                      <Text color="next-primary" decoration="underline">
                        Esqueceu sua senha?
                      </Text>
                    </Link>
                  </Stack>
                  <Button
                    bg={'next-primary'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    onClick={handleSubmit(handleSignup)}
                    disabled={isSubmitting}
                  >
                    CADASTRAR
                  </Button>
                </Stack>
                <Text fontSize="xs">
                  Ao enviar este formulário: Você concorda com o processamento dos dados pessoais
                  submetidos de acordo com a Política de Privacidade da NeXTIME, incluindo a
                  transferência de dados.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </>
    )
  }
}
