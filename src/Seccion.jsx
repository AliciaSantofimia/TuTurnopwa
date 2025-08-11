export default function Seccion({ children, className="" }) {
  return <section className={`mb-6 text-gray-800 ${className}`}>{children}</section>;
}
