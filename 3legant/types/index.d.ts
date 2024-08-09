export interface NavbarLink {
  route: string;
  label: string;
}

export interface SocialLink {
  route: string;
  label: string;
  icon: string;
}

export interface HeaderImg {
  url: string;
  label: string;
}

export interface FeatureCardProps {
  iconUrl: string;
  title: string;
  describtion: string;
}
