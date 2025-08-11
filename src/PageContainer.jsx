export default function PageContainer({ children }) {
  return (
    <div className="bg-[#fffef4] min-h-screen">
      <div className="mx-auto px-4 py-6
                      w-full
                      max-w-screen-sm
                      md:max-w-screen-md
                      lg:max-w-screen-lg
                      xl:max-w-5xl">
        {children}
      </div>
    </div>
  );
}
