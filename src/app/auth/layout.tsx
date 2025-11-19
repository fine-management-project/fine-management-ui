import AppHeader from "@/components/AppHeader/AppHeader";

type Props = {
  children: React.ReactNode;
};

const UnauthenticatedLayout = async ({ children }: Props) => {
  return (
    <div className="h-full">
      <AppHeader isAuthenticated={false} />
      <div className="relative flex h-full p-9 w-full">
        <div className="flex flex-grow-1 flex-wrap justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedLayout;
