'use client'

import { usePresets } from '@/hooks/use-presets'
import { formJSON } from '@/lib/data/form'
import { FormRenderer } from '@/ui/form'

export default function Home() {
  const { email } = usePresets()

  const presets = [email()]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full flex space-x-5'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold'>JSON</h1>
          <pre className='bg-slate-900 p-5 rounded-xl mt-5 text-xs'>
            {JSON.stringify(formJSON, null, 2)}
          </pre>
        </div>
        <div className='flex-1'>
          <FormRenderer
            presets={presets}
            submitLabel='Submit Form'
            onSubmit={async (data) => {
              alert(JSON.stringify(data, null, 2))
            }}
          />
        </div>
      </div>
    </main>
  )
}
