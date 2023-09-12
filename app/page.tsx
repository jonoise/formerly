'use client'

import { formJSON } from '@/lib/data/form'
import { FormRenderer } from '@/ui/form'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <FormRenderer
        json={formJSON}
        onSubmit={async (data) => {
          console.log(data)
        }}
      />
    </main>
  )
}
