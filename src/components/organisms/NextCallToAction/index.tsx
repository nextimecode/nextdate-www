import React from 'react'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { NextCallToAction } from '../../../types/LandingPageItems'
import { CheckCircleIcon } from '@chakra-ui/icons'
const NextCallToAction = ({
  isLoading,
  id,
  color,
  title,
  text,
  image,
  url,
  width,
  height,
  textButton = '< Faça um orçamento />',
  directionMd = 'row',
  directionBase = 'column',
  poolsCount,
  guessesCount,
  usersCount
}: NextCallToAction) => {
  return (
    <Stack id={id} bg={color} align={'center'} direction={{ base: directionBase, md: directionMd }}>
      <Flex flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Flex align={'center'}>
            <AvatarGroup size="md" max={4} me={2}>
              <Avatar name="Luiz Walber" src="/images/people/people1.jpg" />
              <Avatar name="Daniel Keoma" src="/images/people/people2.jpg" />
              <Avatar name="Bruno Izabô" src="/images/people/people3.jpg" />
              <Avatar name="Pedro Duarte" src="/images/people/people4.jpg" />
            </AvatarGroup>
            <Text as={'p'}>
              {!isLoading && usersCount && (
                <Text as={'span'} color={'next-green.500'} fontWeight={'bold'}>
                  {usersCount}
                </Text>
              )}
              <Text as={'span'}> pessoas já estão usando</Text>
            </Text>
          </Flex>
          <Text lineHeight={1.33} fontWeight={600} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            {title}
          </Text>
          <Text fontSize={{ base: 'md', lg: 'lg' }} whiteSpace={'pre-wrap'}>
            {text}
          </Text>
          <Box pb={6} display={{ base: 'none', md: 'block' }}>
            <Link href={url}>
              <Button
                color="white"
                bg={'next-primary'}
                _hover={{
                  bg: 'next-blue.400',
                  color: 'white'
                }}
              >
                {textButton}
              </Button>
            </Link>
          </Box>
          <HStack align={'top'}>
            <Box color={'green.400'} px={2}>
              <Icon as={CheckCircleIcon} w={'40px'} h={'40px'} color={'#129E57'} />
            </Box>
            <VStack align={'start'}>
              {!isLoading && poolsCount && <Text fontWeight={600}>{poolsCount}</Text>}
              <Text color={'gray.600'}>{'Bolões criados'}</Text>
            </VStack>
            <Box color={'green.400'} px={2}>
              <Icon as={CheckCircleIcon} w={'40px'} h={'40px'} color={'#129E57'} />
            </Box>
            <VStack align={'start'}>
              {!isLoading && guessesCount && <Text fontWeight={600}>{guessesCount}</Text>}
              <Text color={'gray.600'}>{'Palpites enviados'}</Text>
            </VStack>
          </HStack>
        </Stack>
      </Flex>
      <Flex py={2} maxW={'30rem'} flex={1}>
        <Image alt={title} src={image} width={width} height={height} />
      </Flex>
      <Box display={{ base: 'block', md: 'none' }}>
        <Link href={url}>
          <Button
            color="white"
            bg={'next-primary'}
            _hover={{
              bg: 'next-blue.400',
              color: 'white'
            }}
          >
            {textButton}
          </Button>
        </Link>
      </Box>
    </Stack>
  )
}

export default NextCallToAction
