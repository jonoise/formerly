export const form = {
  inputs: [
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
