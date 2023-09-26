import { Preset } from '@/ui/form'
import { booleanSchemas, numberSchemas, textSchemas } from './constants'

import * as yup from 'yup'

export const createSchema = (presets?: Preset[]) => {
  const validationsFields = {} as any
  presets?.forEach((p) => {
    let schema = initSchema(p.options.type)

    if (p.options?.shouldMatch) {
      schema = (schema as yup.StringSchema).oneOf(
        [yup.ref(p.options.shouldMatch)],
        p.options.shouldMatchMessage
      )
    }

    if (p.options.type === 'url') {
      schema = (schema as yup.StringSchema).url('Invalid URL')
    }

    if (p.options.rules) {
      for (const rule of Object.keys(p.options?.rules)) {
        switch (rule) {
          case 'required':
            const message =
              typeof p.options.rules[rule] === 'string'
                ? p.options.rules[rule]
                : p.options.rules[rule]?.message

            schema = schema.required(message || 'This field is required')
            break
          case 'minLength':
            // @ts-ignore
            schema = schema.min(
              p.options.rules[rule].value as number,
              p.options.rules[rule].message as string
            )
            break
          case 'min':
            // @ts-ignore
            schema = schema.min(
              p.options.rules[rule].value as number,
              p.options.rules[rule].message as string
            )
            break
          case 'max':
            // @ts-ignore
            schema = schema.max(
              p.options.rules[rule].value as number,
              p.options.rules[rule].message as string
            )
            break
          case 'pattern':
            // @ts-ignore
            schema = schema.matches(
              p.options.rules[rule].value as RegExp,
              p.options.rules[rule].message as string
            )
            break
        }
      }
    }

    validationsFields[p.options.name!] = schema
  })
  return yup.object().shape(validationsFields)
}

export const initSchema = (type: string) => {
  if (textSchemas.includes(type)) {
    return yup.string()
  }
  if (numberSchemas.includes(type)) {
    return yup.number()
  }
  if (booleanSchemas.includes(type)) {
    return yup.boolean()
  }
  if (type === 'address') {
    console.log('address chema')
    return yup
      .object()
      .shape({
        value: yup
          .object()
          .shape({
            primary_line: yup.string().required('Address is required'),
            secondary_line: yup.string(),
            city: yup.string().required('Address is required'),
            state: yup.string().required('Address is required'),
            zip_code: yup.string().required('Address is required'),
          })
          .required('Address is required'),
        label: yup.string(),
      })
      .required('Address is required')
  }

  if (type === 'array') {
    return yup.array()
  }
  return yup.string()
}
