import { User24 } from '@carbon/icons-react';
import {
  Button,
  Grid,
  InlineNotification,
  Loading,
  TextInput,
  ToastNotification,
} from 'carbon-components-react';
import React, { useState } from 'react';
import { Field } from 'react-final-form';
import * as Yup from 'yup';

import { fetcher } from '../../../utils/fetcher';
import { getErrorProps, ToWForm } from '../../../utils/formUtils';

import styles from './LoginForm.module.scss';

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
}).required();
export type LoginType = Yup.InferType<typeof loginSchema>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values: LoginType) => {
    setIsLoading(true);
    fetcher('http://api.sklep.localhost:3002/auth/login', 'POST', values)
      .then((res) => {
        // TODO authorize user
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        console.log(res);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <ToWForm className={styles.form} onSubmit={handleSubmit} schema={loginSchema}>
      <Grid>
        <h2 className={styles.title}>Zaloguj się</h2>
        <Field name="email">
          {({ input, meta }) => (
            <TextInput
              {...input}
              {...getErrorProps(meta)}
              id="email"
              invalidText="Wpisz poprawny adres email"
              labelText="Nazwa użytkownika"
              placeholder="Wpisz nazwę użytkownika"
            />
          )}
        </Field>
        <Field name="password">
          {({ input, meta }) => (
            <TextInput.PasswordInput
              {...input}
              {...getErrorProps(meta)}
              hidePasswordLabel="Hide password"
              id="password"
              invalidText="Pole jest wymagane"
              labelText="Hasło"
              placeholder="Podaj hasło użytkownika"
              showPasswordLabel="Pokaż hasło"
            />
          )}
        </Field>
        <Button kind="primary" type="submit" renderIcon={User24}>
          Zaloguj się
        </Button>
        {isLoading && <Loading />}
        {isSuccess && (
          <ToastNotification
            kind="success"
            title="notka"
            caption="Logowanie udane"
            className={styles.toast}
          />
        )}
        {isError && (
          <InlineNotification
            kind="error"
            title="Wprowadzone dane nie są poprawne"
            onCloseButtonClick={() => setIsError(false)}
          />
        )}
      </Grid>
    </ToWForm>
  );
};
