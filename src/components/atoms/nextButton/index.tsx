import React, { PropsWithChildren } from 'react'
import { Button } from '@chakra-ui/react'

interface NextButtonProps {
  bg?: 'next-blue.400' | 'next-primary' | undefined
}

export function NextButton({ bg = 'next-primary', children }: PropsWithChildren<NextButtonProps>) {
  return <Button bg={bg}>{children}</Button>
}
