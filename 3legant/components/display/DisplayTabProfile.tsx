import AccountForm from "../form/AccountForm";
import AddressForm from "../form/AddressFrom";

interface DisplayTabProfileProps {
  type: string;
}

const DisplayTabProfile = ({ type }: DisplayTabProfileProps) => {
  const componentsMap: { [key: string]: JSX.Element } = {
    account: <AccountForm />,
    address: <AddressForm />,
    order: <div className="w-full">Order</div>,
    wishlist: <div className="w-full">Wishlist</div>,
  };

  return componentsMap[type] || <div>Unknown tab</div>;
};

export default DisplayTabProfile;
