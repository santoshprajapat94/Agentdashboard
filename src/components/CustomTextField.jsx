import React from 'react'

// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { FormHelperText, TextField } from '@mui/material'

// ----------------------------------------------------------------------

export default function CustomTextField({ name, helperText, onChange, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            inputRef={ref}
            onChange={e => {
              field.onChange(e)
              if (onChange) {
                onChange(e)
              }
            }}
            helperText={helperText ? helperText : ''}
            {...other}
          />
          {error ? <FormHelperText sx={{ color: 'error.main' }}>{error?.message}</FormHelperText> : null}
        </>
      )}
    />
  )
}
