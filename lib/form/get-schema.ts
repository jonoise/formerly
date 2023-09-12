import { FormJSON, Input, Step } from '@/ui'
import { z } from 'zod'

const getInputSchema = (input: Input) => {
  let schema = z.object({})

  if (input.type === 'text') {
    schema = schema.merge(z.object({ [input.name]: z.string() }))
  }
  if (input.type === 'select') {
  }
  if (input.type === 'checkbox') {
  }
  if (input.type === 'radio') {
  }

  if (input.rules) {
    if (input.rules.required) {
      schema = schema.merge(
        z.object({
          [input.name]: z.string().min(1, input.rules.required as string),
        })
      )
    }

    if (input.rules.minLength) {
      console.log(input.rules)
      schema = schema.merge(
        z.object({
          [input.name]: z.string().min(input.rules.minLength.value, {
            message: input.rules.minLength.message,
          }),
        })
      )
    }
    if (input.rules.maxLength) {
      schema = schema.merge(
        z.object({
          [input.name]: z
            .string()
            .max(input.rules.maxLength.value, {
              message: input.rules.maxLength.message,
            }),
        })
      )
    }
    if (input.rules.pattern) {
      schema = schema.merge(
        z.object({
          [input.name]: z
            .string()
            .regex(input.rules.pattern.value, input.rules.pattern.message),
        })
      )
    }

    if (input.rules.min) {
      schema = schema.merge(
        z.object({
          [input.name]: z
            .string()
            .min(input.rules.min.value, input.rules.min.message),
        })
      )
    }

    if (input.rules.max) {
      schema = schema.merge(
        z.object({
          [input.name]: z
            .string()
            .max(input.rules.max.value, input.rules.max.message),
        })
      )
    }
  }

  return schema
}

export const getSchema = (form: FormJSON) => {
  const getStepSchema = (step: Step) => {
    let schema = z.object({})

    for (const input of step.inputs) {
      schema = schema.merge(getInputSchema(input))
    }

    return schema
  }

  let schema = z.object({})
  for (const step of form.steps) {
    schema = schema.merge(getStepSchema(step))
  }

  return schema
}
