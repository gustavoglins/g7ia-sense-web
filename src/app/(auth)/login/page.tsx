import LoginForm from './_components/login-form';

export default function AuthLoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <img
        src={'https://ia-sense-dashboard.netlify.app/assets/logo-iasense.png'}
      />
      <LoginForm />
    </div>
  );
}
