'use client'

import { usePresets } from '@/hooks/use-presets'
import { form, form2 } from '@/lib/data/form'
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
          <h1 className='text-4xl font-bold'>JSON</h1>
          <p>It expects an array of inputs.</p>
          <p>The following form is coded as:</p>
          <pre className='rounded-xl mt-5 text-xs'>
            <SyntaxHighlighter
              className='rounded p-5 text-xs'
              language='json'
              style={dracula}
            >
              {'const json = ' +
                JSON.stringify(form, null, 2) +
                '\n' +
                `<FormRenderer
  json={json}
  submitLabel='Submit Form'
  onSubmit={async (data) => {
  alert(JSON.stringify(data, null, 2))
  }}
/>`}
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
      <div className='w-full space-y-5'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold'>JSON</h1>
          <p>
            There are default options to each preset, but you can define your
            own.
          </p>
          <p>The following form is coded as:</p>
          <pre className='rounded-xl mt-5 text-xs'>
            <SyntaxHighlighter
              className='rounded p-5 text-xs'
              language='json'
              style={dracula}
            >
              {'const json = ' +
                JSON.stringify(form2, null, 2) +
                '\n' +
                `<FormRenderer
  json={json}
  submitLabel='Submit Form'
  onSubmit={async (data) => {
  alert(JSON.stringify(data, null, 2))
  }}
/>`}
            </SyntaxHighlighter>
          </pre>
        </div>
        <div className='flex-1'>
          <FormRenderer
            json={form2}
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
