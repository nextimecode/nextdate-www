import React from 'react'

import { Text, HStack, Icon } from '@chakra-ui/react'
import { MultipleFieldErrors } from 'react-hook-form'
import { BsExclamationCircle } from 'react-icons/bs'

type Props = {
  message: string | MultipleFieldErrors
}

const FormErrorText = ({ message }: Props) => {
  if (message) {
    return (
      <React.Fragment>
        <HStack py={1} w="100%" justifyContent="space-between">
          <Text fontWeight="medium" fontSize="xs" color="danger">
            {message.toString()}
          </Text>
          <Icon as={BsExclamationCircle} w={4} h={4} />
        </HStack>
      </React.Fragment>
    )
  }
  return <React.Fragment></React.Fragment>
}

export default FormErrorText
