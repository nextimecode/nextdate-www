import { Flex, Text, Box } from '@chakra-ui/react'
import Card from '../Card'
import CardBody from '../CardBody'
import React from 'react'

interface GameProps {
  title?: string
}

export const Game = ({ title }: GameProps) => {
  return (
    <Card minH="83px">
      <CardBody>
        <Flex flexDirection="row" gap={2} align="center" justify="center" w="100%">
          <Box me="auto">
            <Text as={'h1'} fontSize={'sm'} fontWeight={'bold'}>
              {title}
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}
