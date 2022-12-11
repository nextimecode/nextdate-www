import { useCallback, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as Sentry from '@sentry/nextjs'

import { translateErrorCode } from '../utils/translateErrorCode'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import NextLayout from '../components/templates/NextLayout/index'
import api from '../services/api'

import { Button, FormControl, Input, useToast } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const createPoolFormSchema = z.object({
  title: z.string()
})

type CreatePoolFormInputs = z.infer<typeof createPoolFormSchema>

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<CreatePoolFormInputs>({
    resolver: zodResolver(createPoolFormSchema)
  })

  const handleCreatePool = useCallback(
    async (data: CreatePoolFormInputs) => {
      setIsLoading(true)
      try {
        if (data.title !== '') {
          const response = await api.post(
            'pools',
            { title: data.title },
            {
              headers: {
                Authorization: user?.accessToken
              }
            }
          )
          toast({
            title: response.data.firstName,
            description: 'Seu bolão foi criado com sucesso.',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          router.push('./boloes')
        } else {
          toast({
            title: 'Tivemos um problema ao criar o seu bolão.',
            description: translateErrorCode('Bolão precisa de um nome'),
            status: 'error',
            duration: 9000,
            isClosable: true
          })
        }
      } catch (e: any) {
        let errorMessage = (e as Error).message
        Sentry.captureException(e)
        if (e.response) {
          errorMessage = e.response.data.message
        }
        toast({
          title: 'Tivemos um problema ao salvar seu bolão.',
          description: translateErrorCode(errorMessage),
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
      setIsLoading(false)
    },
    [router, toast, user?.accessToken]
  )

  return (
    <NextLayout>
      <form onSubmit={handleSubmit(handleCreatePool)}>
        <FormControl>
          <Input mb={4} type={'text'} placeholder="Qual o nome do bolão?" {...register('title')} />
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isLoading}
            width={'100%'}
            colorScheme={'green'}
          >
            CRIAR MEU BOLÃO
          </Button>
        </FormControl>
      </form>
    </NextLayout>
  )
}
