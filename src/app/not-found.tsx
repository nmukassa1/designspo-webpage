// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg mt-2">Page not found</p>
        <a href="/" className="text-blue-500 mt-4 inline-block">
          Go Home
        </a>
      </div>
    </div>
  );
}
