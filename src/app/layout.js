import './globals.css';

export const metadata = {
  title: 'FinPro',
  description: 'FinPro safety app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
