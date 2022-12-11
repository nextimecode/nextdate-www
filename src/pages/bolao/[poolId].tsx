/* eslint-disable indent */
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import * as Sentry from '@sentry/nextjs'
import { translateErrorCode } from '../../utils/translateErrorCode'
import NextLayout from '../../components/templates/NextLayout/index'
import api from '../../services/api'
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Skeleton,
  useToast,
  Text,
  useColorModeValue,
  Input,
  Button,
  Grid,
  GridItem,
  Link
} from '@chakra-ui/react'
import { Pool } from '../../types/Pool'
import { useRouter } from 'next/router'
import { Game } from '../../types/Game'
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'

export default function PoolCurrent() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pool, setPool] = useState<Pool>({} as Pool)
  const [games, setGames] = useState<Array<Game>>([])
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const { poolId } = router.query
  const cardBgColor = useColorModeValue('gray.100', 'gray.800')
  const regionNames = new Intl.DisplayNames(['pt-br'], { type: 'region' })
  const [firstTeamPoints, setFirstTeamPoints] = useState<string>('')
  const [secondTeamPoints, setSecondTeamPoints] = useState<string>('')

  const fetchPool = useCallback(async () => {
    setIsLoading(true)
    try {
      const [pool, games] = await Promise.all([
        api.get(`pools/${poolId}`, {
          headers: {
            Authorization: user?.accessToken
          }
        }),
        api.get(`pools/games/${poolId}`, {
          headers: {
            Authorization: user?.accessToken
          }
        })
      ])
      setPool(pool.data)
      setGames(games.data)
    } catch (e: any) {
      let errorMessage = (e as Error).message
      Sentry.captureException(e)
      if (e.response) {
        errorMessage = e.response.data.message
      }
      toast({
        title: 'Tivemos um problema ao buscar as informações do bolão.',
        description: translateErrorCode(errorMessage),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
    setIsLoading(false)
  }, [poolId, toast, user?.accessToken])

  async function handleGuessConfirm(gameId: string) {
    try {
      const response = await api.post(
        `guesses/${poolId}`,
        {
          gameId,
          firstTeamPoints: Number(firstTeamPoints),
          secondTeamPoints: Number(secondTeamPoints)
        },
        {
          headers: {
            Authorization: user?.accessToken
          }
        }
      )
      toast({
        title: response.data.firstName,
        description: 'Seu palpite foi criado com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      fetchPool()
    } catch (e: any) {
      Sentry.captureException(e)
      toast({
        title: 'Tivemos um problema ao criar seu palpite.',
        description: translateErrorCode(e.response.data.message || e.message),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  async function handleJoinPool() {
    try {
      const response = await api.post(
        'pools/join',
        {
          poolId
        },
        {
          headers: {
            Authorization: user?.accessToken
          }
        }
      )
      toast({
        title: response.data.firstName,
        description: 'Você entrou no bolão com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      fetchPool()
    } catch (e: any) {
      Sentry.captureException(e)
      toast({
        title: 'Tivemos um problema.',
        description: translateErrorCode(e.response.data.message || e.message),
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    if (user && user.accessToken) {
      fetchPool()
    }
    localStorage.removeItem('idWhoInvited')
  }, [fetchPool, user])

  const isUserInPool = pool.participants?.find(userId => userId === user.uid)

  return (
    <NextLayout>
      {isLoading && <Skeleton height="83px" />}
      {!isLoading && (
        <>
          {pool?.participants[0] === user?.uid && (
            <Flex alignItems={'center'} pb={6}>
              <Text>Compartilhe agora no whatsapp:</Text>
              <Link href={`https://wa.me/?text=https://bolao.nextime.com.br/bolao/${poolId}`}>
                <Flex
                  bg={'gray.700'}
                  p={2}
                  rounded={'md'}
                  m={3}
                  flexDirection="column"
                  alignItems={'center'}
                  color={'next-primary'}
                >
                  <FaWhatsapp size={30} />
                </Flex>
              </Link>
            </Flex>
          )}
          {!isUserInPool && (
            <Button
              isLoading={isLoading}
              width={'100%'}
              colorScheme={'green'}
              onClick={() => handleJoinPool()}
            >
              PARTICIPAR DO BOLÃO
            </Button>
          )}
          <Flex
            mt={4}
            alignItems={'center'}
            gap={2}
            borderBottom={'1px'}
            borderColor={'next-gray.200'}
          >
            <Box me="auto">
              <Heading as={'h1'} size={'sm'}>
                {pool.title}
              </Heading>
              <Text as={'span'} fontSize={'xs'}>
                Código: {pool.id}
              </Text>
            </Box>
            <AvatarGroup size="sm" max={4}>
              {pool.participants?.map(participant => {
                return <Avatar key={participant} />
              })}
            </AvatarGroup>
          </Flex>
          {isUserInPool && (
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
              {games?.map(game => {
                return (
                  <GridItem key={game.id} w="100%">
                    <Box
                      p={6}
                      maxW={'330px'}
                      w={'full'}
                      bg={cardBgColor}
                      boxShadow={'2xl'}
                      rounded={'lg'}
                      borderBottom={'2px'}
                      borderColor={'next-primary'}
                    >
                      <Flex gap={1} justifyContent={'center'}>
                        <Text fontWeight={'bold'} fontSize={'sm'}>
                          {game.firstTeamCountryCode === 'GB' && 'Inglatera'}
                          {game.firstTeamCountryCode === 'WL' && 'Países de Gales'}
                          {game.firstTeamCountryCode !== 'GB' &&
                            game.firstTeamCountryCode !== 'WL' &&
                            regionNames.of(game.firstTeamCountryCode)}
                        </Text>
                        <Text fontWeight={'bold'} fontSize={'sm'}>
                          vs.
                        </Text>
                        <Text fontWeight={'bold'} fontSize={'sm'}>
                          {game.secondTeamCountryCode === 'GB' && 'Inglatera'}
                          {game.secondTeamCountryCode === 'WL' && 'Países de Gales'}
                          {game.secondTeamCountryCode !== 'GB' &&
                            game.secondTeamCountryCode !== 'WL' &&
                            regionNames.of(game.secondTeamCountryCode)}
                        </Text>
                      </Flex>
                      <Flex justifyContent={'center'}>
                        <Text as={'span'} fontSize={'xs'}>
                          {format(game.date._seconds * 1000, "d 'de' MMMM 'de' y 'às' HH:mm'h'", {
                            locale: ptBR
                          })}
                        </Text>
                      </Flex>
                      <Flex py={4} justifyContent={'center'} alignContent={'center'} gap={2}>
                        {game.firstTeamCountryCode === 'GB' && (
                          <Image src={`/images/gb.png`} alt={'Inglaterra'} width={30} height={19} />
                        )}
                        {game.firstTeamCountryCode === 'WL' && (
                          <Image
                            src={`/images/wl.png`}
                            alt={'Paises de Gales'}
                            width={30}
                            height={19}
                          />
                        )}
                        {game.firstTeamCountryCode !== 'GB' &&
                          game.firstTeamCountryCode !== 'WL' && (
                            <Image
                              src={`https://ipdata.co/flags/${game.firstTeamCountryCode.toLowerCase()}.png`}
                              alt={''}
                              width={30}
                              height={19}
                            />
                          )}

                        {!game.guess && (
                          <Input
                            type={'text'}
                            htmlSize={1}
                            maxHeight={'30px'}
                            width="auto"
                            onChange={event => setFirstTeamPoints(event.target.value)}
                          />
                        )}
                        {game.guess && <Text>{game.guess.firstTeamPoints}</Text>}
                        <Text>X</Text>
                        {!game.guess && (
                          <Input
                            type={'text'}
                            htmlSize={1}
                            maxHeight={'30px'}
                            width="auto"
                            onChange={event => setSecondTeamPoints(event.target.value)}
                          />
                        )}
                        {game.guess && <Text>{game.guess.secondTeamPoints}</Text>}
                        {game.secondTeamCountryCode === 'GB' && (
                          <Image src={`/images/gb.png`} alt={'Inglaterra'} width={30} height={19} />
                        )}
                        {game.secondTeamCountryCode === 'WL' && (
                          <Image
                            src={`/images/wl.png`}
                            alt={'Paises de Gales'}
                            width={30}
                            height={19}
                          />
                        )}
                        {game.secondTeamCountryCode !== 'GB' &&
                          game.secondTeamCountryCode !== 'WL' && (
                            <Image
                              src={`https://ipdata.co/flags/${game.secondTeamCountryCode.toLowerCase()}.png`}
                              alt={''}
                              width={30}
                              height={19}
                            />
                          )}
                      </Flex>
                      <Button
                        type="submit"
                        disabled={!!game?.guess}
                        isLoading={isLoading}
                        width={'100%'}
                        colorScheme={'green'}
                        onClick={() => handleGuessConfirm(game.id)}
                      >
                        {game?.guess ? 'PALPITE CONFIRMADO' : 'CONFIRMAR PALPITE'}
                      </Button>
                      <Text fontSize={'xs'} mt={2}>
                        * O palpite não podem ser modifcado
                      </Text>
                    </Box>
                  </GridItem>
                )
              })}
            </Grid>
          )}
        </>
      )}
    </NextLayout>
  )
}
