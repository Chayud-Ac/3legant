// This layout wrapup the children in root route we will add Navbar and footer here
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import NotificationBar from "@/components/shared/NotificationBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      {/* Notification */}
      <NotificationBar />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="mt-[300px] grow">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default layout;
