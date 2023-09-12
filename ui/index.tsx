import { RegisterOptions } from 'react-hook-form'

export type FormJSON = {
  type: string
  title: string
  description: string
  steps: Step[]
  submit: { label: string; className?: string }
}

export type Step = {
  id: string
  inputs: Input[]
}

export type Input = {
  type: string
  name: string
  label: string
  defaultValue?: string
  className?: string
  placeholder: string
  rules: RegisterOptions
}

type RendererProps = {
  formJSON: FormJSON
}
