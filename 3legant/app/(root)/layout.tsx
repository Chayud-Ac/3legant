// This layout wrapup the children in root route we will add Navbar and footer here

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
