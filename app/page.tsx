'use client'

import { usePresets } from '@/hooks/use-presets'
import { form, form2, form3 } from '@/lib/data/form'
import { FormRenderer } from '@/ui/form'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierCaveDark as dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

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
          <h1 className='text-2xl font-bold'>Address</h1>
          <p>
            A simple text preset with their options and an address preset with
            its default options.
          </p>
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
          <h1 className='text-2xl font-bold'>Sign up</h1>
          <p>
            There are default options to each preset, but you can define your
            own.
          </p>
          <p>
            The password preset when declaring `confirm: true` will look for
            another input with the name as &quot;password&quot;. If it finds it,
            it will validate that the values match. You can define another input
            to validate againts by passing the name as a string to the confirm
            option.
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
      <div className='w-full space-y-5'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>With default values</h1>
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
                JSON.stringify(form3, null, 2) +
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
            json={form3}
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
