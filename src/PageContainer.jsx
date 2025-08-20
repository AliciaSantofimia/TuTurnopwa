export default function PageContainer({ children }) {
  return (
    <div className="w-full">
      {/* padding lateral responsivo */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* ancho máximo consistente + centrado + respiración vertical */}
        <div className="mx-auto max-w-[720px] md:max-w-[860px] lg:max-w-[960px] py-8 md:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
