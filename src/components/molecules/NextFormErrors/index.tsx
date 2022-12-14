/* eslint-disable indent */
import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { NextFormErrorText } from '../../atoms/NextFormErrorText'

type Props = {
  errors: any
  field: string
}

export const NextFormErrors = ({ errors, field }: Props) => {
  return (
    <>
      <ErrorMessage
        errors={errors}
        name={field}
        render={messages => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <NextFormErrorText key={type} message={message} />
              ))
            : null
        }}
      />
    </>
  )
}
