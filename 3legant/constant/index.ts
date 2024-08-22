import {
  CartTabContentProps,
  FeatureCardProps,
  HeaderImg,
  NavbarLink,
  SocialLink,
  profileTabContentProps,
} from "@/types";

export const navbarLinks: NavbarLink[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/products",
    label: "Product",
  },
  {
    route: "/contact-us",
    label: "Contact Us",
  },
];

export const socialLinks: SocialLink[] = [
  {
    route: "/",
    label: "Instragram",
    icon: "/assets/icons/instagram.svg",
  },
  {
    route: "/",
    label: "Facebook",
    icon: "/assets/icons/facebook.svg",
  },
  {
    route: "/",
    label: "Youtube",
    icon: "/assets/icons/youtube.svg",
  },
];

export const imgHeaderUrls: HeaderImg[] = [
  {
    url: "/assets/images/home_header1.svg",
    label: "image1",
  },
  {
    url: "/assets/images/home_header2.svg",
    label: "image2",
  },
  {
    url: "/assets/images/home_header3.svg",
    label: "image3",
  },
];

export const featureCardLists: FeatureCardProps[] = [
  {
    iconUrl: "/assets/icons/fast_delivery.svg",
    title: "Free Shipping",
    describtion: "Order above $200",
  },
  {
    iconUrl: "/assets/icons/money.svg",
    title: "Money-back",
    describtion: "30 days guarantee",
  },
  {
    iconUrl: "/assets/icons/lock1.svg",
    title: "Secure Payments",
    describtion: "Secured by mobile-banking",
  },
  {
    iconUrl: "/assets/icons/call.svg",
    title: "24/7 Support",
    describtion: "Phone and Email support",
  },
];

export const cartTabContent: CartTabContentProps[] = [
  { name: "shopping cart", No: 1, path: "/cart" },
  { name: "Check out details", No: 2, path: "/checkout" },
  { name: "Order complete", No: 3, path: "/order" },
];

export const profileTabContent: profileTabContentProps[] = [
  { name: "Account", value: "account" },
  { name: "Address", value: "address" },
  { name: "Orders", value: "order" },
  { name: "Wishlist", value: "wishlist" },
  { name: "Log out", value: "logout" },
];
