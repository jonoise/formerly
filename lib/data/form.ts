export const formJSON = {
  type: 'form',
  title: 'Form',
  description: 'Form description',
  steps: [
    {
      id: 'step1',
      inputs: [
        {
          type: 'text',
          name: 'name',
          label: 'Name',
          defaultValue: 'Hugo',
          className: 'w-full border-2 text-black rounded px-2 py-1',
          placeholder: 'Enter your name',
          rules: {
            required: 'Name is required',
          },
        },
        {
          type: 'select',
          name: 'country',
          label: 'País',
          className: 'w-full border-2 text-black rounded px-2 py-1 bg-white',
          placeholder: 'Selecciona tu país',
          rules: {
            required: 'El apellido es requerido',
          },
        },
        {
          type: 'text',
          name: 'lastName',
          label: 'Apellido',
          defaultValue: 'Sanchez',
          className: 'w-full border-2 text-black rounded px-2 py-1',
          placeholder: 'Ingresa tu apellido',
          rules: {
            required: 'El apellido es requerido',
          },
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email',
          className: 'w-full border-2 text-black rounded px-2 py-1',
          placeholder: 'Ingresa tu email',
          rules: {
            required: 'El email es requerido',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'El email no es valido',
            },
          },
        },
        {
          type: 'password',
          name: 'password',
          label: 'Contraseña',
          className: 'w-full border-2 text-black rounded px-2 py-1',
          placeholder: 'Ingresa tu contraseña',
          rules: {
            required: 'La contraseña es requerida',
          },
        },
        {
          type: 'text',
          name: 'socialSecurityNumber',
          label: 'Numero de seguro social',
          defaultValue: '212424243',
          className: 'w-full border-2 text-black rounded px-2 py-1',
          placeholder: 'Ingresa tu SSN',
          rules: {
            minLength: {
              value: 9,
              message: 'El SSN debe tener 9 digitos',
            },
            maxLength: {
              value: 9,
              message: 'El SSN debe tener 9 digitos',
            },
            required: 'El SSN es requerido',
            valueAsNumber: true,
          },
        },
      ],
    },
  ],
  submit: {
    label: 'Submit',
    className: 'bg-blue-500 text-white rounded px-2 py-1',
  },
}
