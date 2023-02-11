import Navigation from "../components/Navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation></Navigation>
      {children}
    </>
  );
}
export default Layout;
