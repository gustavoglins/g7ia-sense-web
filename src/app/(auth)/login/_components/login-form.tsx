'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/shared/routes';
import { LoginFormData, loginSchema } from '@/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await authClient.signIn.username({
        username: data.username,
        password: data.password,
      });

      router.push(ROUTES.DASHBOARD.ROOT);
    } catch (err) {
      console.log('Login Error: ' + err);
    }
  }

  return (
    <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-username">Usuário</FieldLabel>
              <Input
                {...field}
                type="text"
                id="form-login-username"
                autoComplete="off"
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password">Senha</FieldLabel>
              <Input
                {...field}
                type="password"
                id="form-login-username"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" form="form-login">
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
