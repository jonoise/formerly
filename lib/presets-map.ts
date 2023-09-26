import { Preset } from '@/ui/form'
import { email } from '@/ui/presets/email'
import { password } from '@/ui/presets/password'

export const presetsMap = {
  email: email,
  password: password,
}

export const getPresets = (json: any) => {
  const presets = [] as any
  json.inputs.forEach((input: any) => {
    if (input.type in presetsMap) {
      console.log(input.type)
      const preset = presetsMap[input.type as keyof typeof presetsMap]
      if (input?.options !== undefined) {
        presets.push(preset(input.options))
      } else {
        presets.push(preset())
      }
    }
  })
  return presets as Preset[]
}
