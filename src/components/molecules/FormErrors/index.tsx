/* eslint-disable indent */
import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import FormErrorText from '../../atoms/FormErrorText'

type Props = {
  errors: any
  field: string
}

const FormErrors = ({ errors, field }: Props) => {
  return (
    <>
      <ErrorMessage
        errors={errors}
        name={field}
        render={messages => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <FormErrorText key={type} message={message} />
              ))
            : null
        }}
      />
    </>
  )
}

export default FormErrors
