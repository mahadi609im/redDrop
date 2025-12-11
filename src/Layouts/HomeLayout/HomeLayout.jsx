import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';

const HomeLayout = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div className="flex flex-col min-h-screen h-full">
          <Loading></Loading>
        </div>
        <footer className="mt-20">
          <Footer />
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen h-full transition-all duration-500">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
