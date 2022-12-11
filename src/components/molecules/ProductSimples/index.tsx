import { Box, Center } from '@chakra-ui/react'
import Image from 'next/image'

interface ProductSimpleProps {
  image: string
}

export default function ProductSimple({ image }: ProductSimpleProps) {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={8}
        maxW={'330px'}
        w={'full'}
        bg="gray.800"
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
      >
        <Image width={577} height={433} alt="NeXTIME Logo" src={image} />
      </Box>
    </Center>
  )
}
