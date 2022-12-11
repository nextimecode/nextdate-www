import { Flex, AvatarGroup, Avatar, Text, Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

interface MiniStatisticsProps {
  poolId: string
  title?: string
  participants: Array<string>
  ownerName: string
  isLoading: boolean
}

export const MiniStatistics = ({ poolId, title, participants, ownerName }: MiniStatisticsProps) => {
  const cardBgColor = useColorModeValue('gray.100', 'gray.800')
  return (
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
      <Link href={`/bolao/${poolId}`}>
        <Flex flexDirection="row" gap={2} align="center" justify="center" w="100%">
          <Box me="auto">
            <Text as={'h1'} fontSize={'sm'} fontWeight={'bold'}>
              {title}
            </Text>
            <Text as={'p'} fontSize={'xs'}>
              Criado por {ownerName}
            </Text>
          </Box>
          <AvatarGroup size="sm" max={4}>
            {participants?.map(participant => {
              return <Avatar key={participant} />
            })}
          </AvatarGroup>
        </Flex>
      </Link>
    </Box>
  )
}
