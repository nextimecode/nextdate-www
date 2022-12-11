import { Box, useStyleConfig } from '@chakra-ui/react'
import React from 'react'

function Card({ variant, children, ...rest }: any) {
  const styles = useStyleConfig('Card', { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export default Card
