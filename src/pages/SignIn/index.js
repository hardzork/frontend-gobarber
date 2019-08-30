import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Spinner from 'react-spinkit';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido.')
    .required('Você precisa informar um e-mail para continuar.'),
  password: Yup.string().required(
    'Você precisa informar uma senha para continuar'
  ),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">
          {loading ? (
            <Spinner name="double-bounce" fadeIn="none" color="white" />
          ) : (
            'Acessar'
          )}
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
