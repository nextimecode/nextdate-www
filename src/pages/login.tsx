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
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../contexts/AuthContext'
import * as z from 'zod'
import { translateErrorCode } from '../utils/translateErrorCode'
import { useRouter } from 'next/router'
import Head from 'next/head'
import * as Sentry from '@sentry/nextjs'

const searchFormSchema = z.object({
  email: z.string(),
  password: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export default function Login() {
  const router = useRouter()
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const color = useColorModeValue('black', 'white')
  const bgBox = useColorModeValue('white', 'gray.700')
  const { user, login } = useAuth()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })
  async function handleLogin(data: SearchFormInputs) {
    try {
      await login(data.email, data.password)
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
    router.push('/boloes')
  } else {
    return (
      <Box bg={bgColor} color={color}>
        <Head>
          <title>NeXTBolao | Login</title>
        </Head>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'} textAlign="center">
              <Link href="/">
                <Text as="span" fontSize={'lg'} color={'next-blue.400'} decoration={'underline'}>
                  Voltar para o site
                </Text>
              </Link>
              <Heading fontSize={'xl'}>Faça login no NeXTBolao</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Não tem conta?{' '}
                <Link href="/cadastro">
                  <Text as="span" fontSize={'lg'} color={'next-primary'}>
                    CADASTRE-SE
                  </Text>
                </Link>
                ✌️
              </Text>
            </Stack>
            <Box minW="350px" maxW="600px" rounded={'lg'} bg={bgBox} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    type="email"
                    id="emailAddress"
                    aria-describedby="email-helper-text"
                    placeholder="Digite seu email cadastrado"
                    {...register('email')}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Digite uma senha"
                    {...register('password')}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link href="/recuperar-senha">Esqueceu sua senha?</Link>
                  </Stack>
                  <Button
                    bg={'next-primary'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    onClick={handleSubmit(handleLogin)}
                    disabled={isSubmitting}
                  >
                    LOGIN
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    )
  }
}
