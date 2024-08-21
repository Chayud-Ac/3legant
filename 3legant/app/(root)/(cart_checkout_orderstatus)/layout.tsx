import { cartTabContent } from "@/constant";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col justify-center items-center pt-10 container-1 ">
      <h1 className="h3-medium text-dark-1">Cart</h1>
      <div className="flex sm:flex-row justify-between items-center w-full max-w-[900px] pt-10">
        {cartTabContent.map((tab) => (
          <div className="flex flex-col justify-start items-start gap-6 w-full max-w-[250px] max-sm:hidden">
            <div className="flex flex-row gap-5 justify-center items-center">
              <div className="bg-dark-1 rounded-full pt-2 pb-2 pl-4 pr-4 text-light-1">
                {tab.No}
              </div>
              <p className="medium-base text-dark-1">{tab.name}</p>
            </div>
            <span className="bg-dark-1 w-full h-[2px] rounded-md"></span>
          </div>
        ))}

        <div className="flex flex-row justify-between items-center sm:hidden w-full">
          <div>
            <div className="flex flex-row gap-5 justify-center items-center">
              <div className="bg-dark-1 rounded-full pt-2 pb-2 pl-4 pr-4 text-light-1">
                1
              </div>
              <p className="medium-base text-dark-1">Shopping Cart</p>
            </div>
            <span className="bg-dark-1 w-full h-[2px] rounded-md"></span>
          </div>
          <div className="bg-dark-1 rounded-full pt-1 pb-1 pl-3 pr-3 text-center items-center text-light-1">
            1
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default layout;
