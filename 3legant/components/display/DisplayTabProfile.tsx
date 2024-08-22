import AccountForm from "../form/AccountForm";
import AddressForm from "../form/AddressFrom";

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
    wishlist: <div className="w-full">Wishlist</div>,
  };

  return componentsMap[type] || <div>Unknown tab</div>;
};

export default DisplayTabProfile;
