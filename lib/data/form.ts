export const form = {
  inputs: [
    {
      type: 'text',
      options: {
        name: 'full_name',
        label: 'Full Name',
        props: {
          placeholder: 'Paracelso de la Fuente',
        },
        rules: {
          required: 'YoUr NaMe Is ReQuIrEd',
        },
      },
    },
    {
      type: 'address',
    },
  ],
}

export const form2 = {
  inputs: [
    {
      type: 'email',
    },
    {
      type: 'password',
    },
    {
      type: 'password',
      options: {
        name: 'confirmPassword',
        label: 'Confirm Password',
        confirm: true,
      },
    },
  ],
}
