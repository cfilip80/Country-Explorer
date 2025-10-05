import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>&copy; {year} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
