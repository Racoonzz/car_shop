import { Link, Head } from '@inertiajs/react';

export default function Home() {
  return (
    <>
      <Head title="Főoldal" />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Üdvözlünk a BMW Alkatrész Weboldalon!</h1>
          <p className="mb-8 text-lg">Válaszd ki, hogy szeretnél bejelentkezni vagy regisztrálni:</p>
          <div className="space-x-4">
            <Link
              href={route('login')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Bejelentkezés
            </Link>
            <Link
              href={route('register')}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Regisztráció
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
