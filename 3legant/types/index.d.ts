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

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
