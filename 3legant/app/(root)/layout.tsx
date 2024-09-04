// This layout wrapup the children in root route we will add Navbar and footer here
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import NotificationBar from "@/components/shared/NotificationBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StoreProvider } from "@/store/StoreProvider";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <StoreProvider session={session}>
      <main className="relative">
        {/* Notification */}
        <NotificationBar />
        <div className="flex flex-col min-h-screen">
          <Navbar session={session} />
          <div className="grow">{children}</div>
          <Footer />
        </div>
      </main>
    </StoreProvider>
  );
};

export default layout;
