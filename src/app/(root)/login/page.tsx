import LoginForm from "./LoginForm";

const LINK_ERRORS: Record<string, string> = {
  link_invalid: "That link is invalid or has expired. Please try again.",
};

async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-5xl">
        <LoginForm
          next={next}
          initialError={error ? LINK_ERRORS[error] ?? null : null}
        />
      </div>
    </div>
  );
}

export default LoginPage;
