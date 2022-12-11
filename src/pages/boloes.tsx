import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as Sentry from '@sentry/nextjs'

import { translateErrorCode } from '../utils/translateErrorCode'

import NextLayout from '../components/templates/NextLayout/index'
import api from '../services/api'

import { Button, Center, Grid, GridItem, Skeleton, useToast, Text } from '@chakra-ui/react'
import { Pool } from '../types/Pool'
import { MiniStatistics } from '../components/molecules/MiniStatistics'
import Link from 'next/link'

import { useRouter } from 'next/router'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pools, setPools] = useState<Array<Pool>>([])
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const fetchInfo = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get('pools', {
        headers: {
          Authorization: user?.accessToken
        }
      })
      setPools(response.data)
    } catch (e: any) {
      let errorMessage = (e as Error).message
      Sentry.captureException(e)
      if (e.response) {
        errorMessage = e.response.data.message
      }
      toast({
        title: 'Tivemos um problema ao buscar as informações do usuário.',
        description: translateErrorCode(errorMessage) || 'Tente reiniciar a página',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
    setIsLoading(false)
  }, [toast, user?.accessToken])

  const redirectIfInvited = useCallback(async () => {
    const idWhoInvited = await localStorage.getItem('idWhoInvited')
    if (idWhoInvited) {
      router.push(`/bolao/${idWhoInvited}`)
    }
  }, [router])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchInfo()
    }
  }, [fetchInfo, user])

  useEffect(() => {
    redirectIfInvited()
  }, [redirectIfInvited])

  return (
    <NextLayout>
      {isLoading && <Skeleton height="83px" />}
      {!isLoading && (
        <>
          <Center mb={6}>
            <Link href={`/bolao/W1hYgo3zppOUvC3FkCei`}>
              <Button
                color="white"
                bg={'next-primary'}
                _hover={{
                  bg: 'next-blue.400',
                  color: 'white'
                }}
              >
                Bolão geral da NeXTIME
              </Button>
            </Link>
          </Center>
          <Text mb={2}>Meus bolões:</Text>
          {pools.length === 0 && (
            <Center height={'50Vh'}>
              <Link href="/criar-bolao">
                <Button
                  color="white"
                  bg={'next-primary'}
                  _hover={{
                    bg: 'next-blue.400',
                    color: 'white'
                  }}
                >
                  Criar bolão
                </Button>
              </Link>
            </Center>
          )}
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={2}>
            {pools?.map(pool => {
              return (
                <GridItem key={pool?.id} w="100%">
                  <MiniStatistics
                    poolId={pool?.id}
                    title={pool?.title}
                    participants={pool?.participants}
                    ownerName={pool?.ownerName}
                    isLoading={isLoading}
                  />
                </GridItem>
              )
            })}
          </Grid>
        </>
      )}
    </NextLayout>
  )
}
