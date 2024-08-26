import AccountForm from "../form/AccountForm";
import AddressForm from "../form/AddressFrom";
import WishListDesktop from "../list/WishListDesktop";
import WishListMobile from "../list/WishListMobile";

interface DisplayTabProfileProps {
  type: string;
  userId: string;
}

const DisplayTabProfile = ({ type, userId }: DisplayTabProfileProps) => {
  console.log(userId);
  const componentsMap: { [key: string]: JSX.Element } = {
    account: <AccountForm userId={userId} />,
    address: <AddressForm userId={userId} />,
    order: <div className="w-full">Order</div>,
    wishlist: (
      <>
        <WishListDesktop /> <WishListMobile />
      </>
    ),
  };

  return componentsMap[type] || <div>Unknown tab</div>;
};

export default DisplayTabProfile;
