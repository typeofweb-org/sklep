import { User24 } from '@carbon/icons-react';
import {
  Button,
  Grid,
  InlineLoading,
  InlineNotification,
  TextInput,
} from 'carbon-components-react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { useMutation, useQueryCache } from 'react-query';
import * as Yup from 'yup';

import { getErrorProps, ToWForm } from '../../../utils/formUtils';
import { useToasts } from '../toasts/Toasts';

import styles from './LoginForm.module.scss';
import { login } from './loginFormUtils';

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
}).required();
export type LoginType = Yup.InferType<typeof loginSchema>;

const AUTH_QUERY_KEY = ['/auth/me', 'GET'];

export const LoginForm = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const cache = useQueryCache();

  const [mutate, { isLoading, isError, isSuccess, status }] = useMutation(login, {
    onSettled: () => cache.invalidateQueries(AUTH_QUERY_KEY),
    onSuccess() {
      addToast({
        kind: 'success',
        title: 'Logowanie udane',
        caption: '',
      });
      void router.replace('/admin/products');
    },
  });

  const handleSubmit = useCallback(
    (values: LoginType) => {
      void mutate(values);
    },
    [mutate],
  );

  const loginButtonText = React.useMemo(() => {
    switch (status) {
      case 'success':
        return <InlineLoading status="finished" description="Logowanie…" />;
      case 'loading':
        return <InlineLoading status="active" description="Logowanie…" />;
      default:
        return 'Zaloguj się';
    }
  }, [status]);

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
              labelText="Adres e-mail"
              placeholder="test@typeofweb.com"
            />
          )}
        </Field>
        <Field name="password">
          {({ input, meta }) => (
            <TextInput.PasswordInput
              {...input}
              {...getErrorProps(meta)}
              id="password"
              invalidText="Pole jest wymagane"
              labelText="Hasło"
              placeholder=""
              showPasswordLabel="Pokaż hasło"
              hidePasswordLabel="Ukryj hasło"
            />
          )}
        </Field>
        <Button kind="primary" type="submit" disabled={isSuccess || isLoading} renderIcon={User24}>
          {loginButtonText}
        </Button>
        {isError && <InlineNotification kind="error" title="Wprowadzone dane nie są poprawne" />}
      </Grid>
    </ToWForm>
  );
};
