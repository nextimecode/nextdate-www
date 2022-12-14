import { createContext, ReactNode } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, Text } from '@chakra-ui/react'
import FormErrors from '../FormErrors'

interface InputContextProps {
  field: string
  label: string
  validator?: RegisterOptions
  isDisabled?: boolean
}

interface Props extends InputContextProps {
  children: ReactNode
  showLabel?: boolean
}

export const InputContext = createContext<InputContextProps | null>(null)

const DefaultInput = ({
  children,
  showLabel = true,
  field,
  label,
  validator = {},
  isDisabled = false
}: Props) => {
  const formContext = useFormContext()

  return (
    <InputContext.Provider
      value={{
        field,
        label,
        validator,
        isDisabled
      }}
    >
      <FormControl>
        {showLabel && (
          <FormLabel htmlFor={field}>
            {label}
            {label.slice(-1) !== '?' && ':'}
            {validator.required && (
              <Text as="span" color="primary-lighter">
                {' *'}
              </Text>
            )}
          </FormLabel>
        )}
        {children}
        {formContext?.formState.errors[field] && (
          <FormErrors errors={formContext?.formState.errors} field={field} />
        )}
      </FormControl>
    </InputContext.Provider>
  )
}

export default DefaultInput
