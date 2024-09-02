import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { StoreProvider } from "@/store/StoreProvider";
import OrderProvider from "@/context/OrderProvider";
import CartCheckoutTab from "@/components/shared/CartCheckoutTab";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <StoreProvider session={session}>
      <OrderProvider>
        <main className="relative flex flex-col justify-center items-center pt-10 container-1 ">
          <CartCheckoutTab />

          <div className="flex flex-col w-full items-center justify-center">
            {children}
          </div>
        </main>
      </OrderProvider>
    </StoreProvider>
  );
};

export default layout;
