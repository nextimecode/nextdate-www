import React, { useContext, useEffect, useState } from 'react'
import { Select, Skeleton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { InputContext } from '../../molecules/DefaultInput'

export interface SelectItemsInterface {
  label?: string | undefined
  value?: string | number | undefined
}

type Props = {
  options: SelectItemsInterface[]
  placeholder?: string
  defaultValue?: string
  borderColor?: string
  setControlValue?: any
  isLoading?: boolean
}

const InputSelect = ({
  options,
  placeholder = 'Selecione',
  defaultValue,
  borderColor,
  setControlValue,
  isLoading
}: Props) => {
  const formContext = useFormContext()
  const inputContext = useContext(InputContext)
  const [value, setValue] = useState<string | undefined>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  if (isLoading) {
    return <Skeleton height="20px" />
  }

  if (inputContext !== null) {
    return (
      <>
        <Select
          id={inputContext.field}
          w="100%"
          isInvalid={!!formContext.formState.errors[inputContext.field]}
          {...formContext.register(inputContext.field, inputContext.validator)}
          placeholder={placeholder}
          borderColor={borderColor}
          color={'black'}
          bg={'white'}
          defaultValue={value}
          onChange={event => {
            setValue(event.target.value)
            setControlValue && setControlValue(event.target.value)
          }}
        >
          {options.map((selectItem, index) => {
            return (
              <option
                key={index}
                style={{
                  color: selectItem.value === '' ? 'gray.500' : 'black'
                }}
                value={selectItem.value || selectItem.label}
              >
                {selectItem.label}
              </option>
            )
          })}
        </Select>
      </>
    )
  } else {
    return <></>
  }
}

export default InputSelect
