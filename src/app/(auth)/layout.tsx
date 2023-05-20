interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-yellow-50">
      {children}
    </div>
  );
}
