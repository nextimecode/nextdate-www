import { Box, Flex, Heading, keyframes } from '@chakra-ui/react'

interface NextStatusIndicator {
  isOpenMarket?: boolean
}

export function NextStatusIndicator({ isOpenMarket = false }) {
  const color = isOpenMarket ? 'green.500' : 'red.400'
  const ringScaleMin = 0.33
  const ringScaleMax = 0.66
  const text = isOpenMarket ? 'Mercado aberto' : 'Mercado fechado'

  const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	}
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`

  const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`

  return (
    <Flex justifyContent="center" alignItems="center" h="100px" w="full" overflow="hidden">
      <Heading as="h1" textAlign="center">
        {text}
      </Heading>
      <Box
        as="div"
        h="24px"
        w="24px"
        mb="1.99em"
        position="relative"
        bgColor={color}
        borderRadius="50%"
        _before={{
          content: "''",
          position: 'relative',
          display: 'block',
          width: '300%',
          height: '300%',
          boxSizing: 'border-box',
          marginLeft: '-100%',
          marginTop: '-100%',
          borderRadius: '50%',
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`
        }}
        _after={{
          animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`
        }}
      />
    </Flex>
  )
}
