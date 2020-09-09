import { User24 } from '@carbon/icons-react';
import { Button, Column, FormGroup, Grid, Row, TextInput } from 'carbon-components-react';
import React from 'react';

import { getErrorProps, ToWForm } from '../../../utils/formUtils';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <ToWForm className={styles.form}>
      <Grid>
        <h2 className={styles.title}>Log in</h2>
        <FormGroup>
          <TextInput
            id="test2"
            invalidText="A valid value is required"
            labelText="Nazwa użytkownika"
            placeholder="Wpisz nazwę użytkownika"
          />
        </FormGroup>
        <FormGroup>
          <TextInput.PasswordInput
            hidePasswordLabel="Hide password"
            id="test2"
            invalidText="A valid value is required"
            labelText="Hasło"
            placeholder="Podaj hasło użytkownika"
            showPasswordLabel="Pokaż hasło"
          />
        </FormGroup>
      </Grid>

      <Grid fullWidth>
        <Row>
          <Column>
            <p>Log in with</p>
          </Column>
          <Column>
            <Button kind="primary" type="submit" renderIcon={User24} className={styles.loginButton}>
              Zaloguj się
            </Button>
          </Column>
        </Row>
      </Grid>
    </ToWForm>
  );
};

export default LoginForm;
