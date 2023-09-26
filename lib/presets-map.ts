import { Preset } from '@/ui/form'
import { address } from '@/ui/presets/address'
import { email } from '@/ui/presets/email'
import { password } from '@/ui/presets/password'

export const presetsMap = {
  email,
  password,
  address,
}

export const getPresets = (json: any) => {
  const presets: Preset[] = []
  if (!json?.inputs) return presets
  if (!Array.isArray(json.inputs)) return presets

  json?.inputs.forEach((input: any) => {
    if (input.type in presetsMap) {
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
