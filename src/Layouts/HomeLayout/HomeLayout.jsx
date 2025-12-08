import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const HomeLayout = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div className="flex flex-col min-h-screen h-full">
          <h3>Loading..</h3>
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
