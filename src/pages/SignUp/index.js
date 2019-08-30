import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Você precisa informar um nome para continuar'),
  email: Yup.string()
    .email('Informe um e-mail válido.')
    .required('Você precisa informar um e-mail para continuar.'),
  password: Yup.string()
    .min(6, 'A sua senha deve conter no mínimo 6 caracteres.')
    .required('Você precisa informar uma senha para continuar'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu Nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
