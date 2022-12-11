import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../contexts/AuthContext'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { translateErrorCode } from '../../../utils/translateErrorCode'
import * as Sentry from '@sentry/nextjs'

const searchFormSchema = z.object({
  email: z.string(),
  password: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Signup() {
  const { user, signup } = useAuth()
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
      await signup(data.email, data.password)
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
    return (
      <Box
        p={8}
        backgroundColor={'green.700'}
        border={'1px'}
        borderColor={'green.700'}
        rounded={'base'}
      >
        <Text as={'strong'} fontSize={'2xl'}>
          Agora é só aguardar...
        </Text>
      </Box>
    )
  }

  return (
    <Box
      p={8}
      backgroundColor={'gray.700'}
      border={'1px'}
      borderColor={'gray.500'}
      rounded={'base'}
    >
      <VStack
        w={['100%', '50%']}
        minW={['auto', '280px']}
        spacing={8}
        align="stretch"
        placeSelf="center"
      >
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            w={['100%', '280px']}
            type="email"
            id="emailAddress"
            aria-describedby="email-helper-text"
            placeholder="Digite seu email cadastrado"
            {...register('email')}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            w={['100%', '280px']}
            type="password"
            id="password"
            placeholder="Digite uma senha"
            {...register('password')}
          />
        </FormControl>
        <Button
          bg={'next-primary'}
          _hover={{
            bg: 'next-blue.400'
          }}
          onClick={handleSubmit(handleSignup)}
          disabled={isSubmitting}
        >
          Enviar
        </Button>
      </VStack>
    </Box>
  )
}
