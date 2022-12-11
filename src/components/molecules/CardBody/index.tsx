import { Box, useStyleConfig } from '@chakra-ui/react'
import React from 'react'

function CardBody({ variant, children, ...rest }: any) {
  const styles = useStyleConfig('CardBody', { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export default CardBody
