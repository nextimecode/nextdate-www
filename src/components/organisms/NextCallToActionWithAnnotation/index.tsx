import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function NextCallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 8 }} pb={[8, 16]}>
          <Heading fontWeight={600} lineHeight={'100%'}>
            É PARA{' '}
            <Text as={'span'} color={'next-primary'}>
              DIVERSÃO!
            </Text>
          </Heading>
          <Text>
            Não usamos dinheiro real. O{' '}
            <Text as="span" color={'next-primary'}>
              NeXTBolao
            </Text>{' '}
            é um game produzido pela empresa{' '}
            <Text as="span" color={'next-blue.400'} _hover={{ 'text-decoration': 'underline' }}>
              <Link href="https://www.nextime.com.br/">NeXTIME</Link>
            </Text>{' '}
            no qual você deixa seu palpite nos participantes dos realities shows. Você pode
            acompanhar seu reality favorito de maneira divertida competindo com os seus amigos e
            outros.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Link href={'/cadastro'}>
              <Button
                bg={'next-primary'}
                px={6}
                _hover={{
                  bg: 'next-blue.400'
                }}
              >
                Quero deixar meu palpite
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
