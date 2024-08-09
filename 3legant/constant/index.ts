import { HeaderImg, NavbarLink, SocialLink } from "@/types";

export const navbarLinks: NavbarLink[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/product",
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
