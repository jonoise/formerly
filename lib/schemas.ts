import { Preset } from '@/ui/form'
import {
  booleanSchemas,
  numberSchemas,
  objectSchemas,
  textSchemas,
} from './constants'

import * as yup from 'yup'

export const createSchema = (presets?: Preset[]) => {
  const validationsFields = {} as any

  presets?.forEach((p) => {
    let schema = initSchema(p.options.name!)

    if (p.options?.shouldMatch) {
      schema = (schema as yup.StringSchema).oneOf(
        [yup.ref(p.options.shouldMatch)],
        p.options.shouldMatchMessage
      )
    }

    if (p.options.name === 'url') {
      schema = (schema as yup.StringSchema).url('Invalid URL')
    }

    for (const rule of Object.keys(p.options.rules!)) {
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
    validationsFields[p.options.name!] = schema
  })
  return yup.object().shape(validationsFields)
}

export const initSchema = (name: string) => {
  if (textSchemas.includes(name)) {
    return yup.string()
  }
  if (numberSchemas.includes(name)) {
    return yup.number()
  }
  if (booleanSchemas.includes(name)) {
    return yup.boolean()
  }
  if (objectSchemas.includes(name)) {
    return yup.object()
  }
  if (name === 'array') {
    return yup.array()
  }
  return yup.string()
}
