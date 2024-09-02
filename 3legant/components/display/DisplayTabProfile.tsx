import AccountForm from "../form/AccountForm";
import AddressForm from "../form/AddressFrom";
import OrderListProfile from "../list/OrderListProfile";

import WishListDesktop from "../list/WishListDesktop";
import WishListMobile from "../list/WishListMobile";

interface DisplayTabProfileProps {
  type: string;
  userId: string;
}

const DisplayTabProfile = ({ type, userId }: DisplayTabProfileProps) => {
  const componentsMap: { [key: string]: JSX.Element } = {
    account: <AccountForm userId={userId} />,
    address: <AddressForm userId={userId} />,
    order: <OrderListProfile userId={userId} />,
    wishlist: (
      <div className="flex-col">
        <h1 className="text-dark-1 medium-xl">WishLists</h1>
        <WishListDesktop /> <WishListMobile />
      </div>
    ),
  };

  return componentsMap[type] || <div>Unknown tab</div>;
};

export default DisplayTabProfile;
