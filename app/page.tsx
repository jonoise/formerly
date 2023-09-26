'use client'

import { usePresets } from '@/hooks/use-presets'
import { form } from '@/lib/data/form'
import { FormRenderer } from '@/ui/form'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierCaveDark as dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const snippet = `export default function Home() {
const { email, password } = usePresets()

const presets = [
  email(),
  password(),
  password({
    label: 'Confirm Password',
    name: 'confirmPassword',
    confirm: true,
  }),
]

return (
  <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex-1'>
        <FormRenderer
          presets={presets}
          submitLabel='Submit Form'
          onSubmit={async (data) => {
            alert(JSON.stringify(data, null, 2))
          }}
        />
      </div>
  </main>
}
`

export default function Home() {
  const { email, password } = usePresets()

  const presets = [
    email(),
    password(),
    password({
      label: 'Confirm Password',
      name: 'confirmPassword',
      confirm: true,
    }),
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full space-y-5'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold'>Presets</h1>
          <p>This example works with presets.</p>
          <p>The following form is coded as:</p>
          <pre className='rounded-xl mt-5 text-xs'>
            <SyntaxHighlighter
              className='rounded p-5 text-xs'
              language='jsx'
              style={dracula}
            >
              {snippet}
            </SyntaxHighlighter>
          </pre>
        </div>
        <div className='flex-1'>
          <FormRenderer
            json={form}
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
