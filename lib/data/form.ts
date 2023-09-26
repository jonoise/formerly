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

export const form3 = {
  inputs: [
    {
      type: 'text',
      options: {
        name: 'name',
        label: 'Name',
        props: {
          defaultValue: 'John Doe',
        },
      },
    },
    {
      type: 'text',
      options: {
        name: 'profession',
        label: 'Profession',
        props: {
          defaultValue: 'Attorney',
        },
      },
    },
    {
      type: 'address',
      options: {
        props: {
          defaultValue: {
            value: {
              primary_line: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zip_code: '12345',
            },
            label: '123 Main St, Anytown, CA 12345',
          },
        },
      },
    },
  ],
}
