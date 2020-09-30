import { User24 } from '@carbon/icons-react';
import { Button, Grid, InlineNotification, Loading, TextInput } from 'carbon-components-react';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { ResponseError } from '../../../utils/fetcher';
import { getErrorProps, ToWForm } from '../../../utils/formUtils';
import { useToasts } from '../toasts/Toasts';

import styles from './LoginForm.module.scss';
import { login } from './loginFormUtils';

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
}).required();
export type LoginType = Yup.InferType<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [mutate, { isLoading, isError, error }] = useMutation(login, {
    onSuccess() {
      addToast({
        kind: 'success',
        title: 'Logowanie udane',
        caption: '',
      });
      void router.replace('/admin/products');
    },
    onError() {
      // @todo
    },
  });

  const handleSubmit = useCallback(
    (values: LoginType) => {
      void mutate(values);
    },
    [mutate],
  );

  const errorMsg = useMemo(() => {
    if (error instanceof ResponseError) {
      if (error.status === 401) {
        return 'Podane dane są niepoprawne';
      }

      if (error.status === 500) {
        return 'Coś poszło nie tak, błąd serwera';
      }
    }

    return 'Wystąpił błąd podczas logowania. Spróbuj ponownie.';
  }, [error]);

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
              labelText="Adres email"
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
        {isError && <InlineNotification kind="error" title={errorMsg} />}
      </Grid>
    </ToWForm>
  );
};
