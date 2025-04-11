import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div id="wrap">
    <div id="accessibility">
      <a href="#container">본문 바로가기</a>
    </div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout; 