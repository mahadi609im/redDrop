import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import { Bounce, ToastContainer } from 'react-toastify';

const HomeLayout = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div>
        <header className="mb-16 md:mb-[70px] lg:mb-20">
          <Navbar />
        </header>
        <div className="flex flex-col min-h-screen h-full ">
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
      <header className="mb-16 md:mb-[70px] lg:mb-20">
        <Navbar />
      </header>
      <main className="flex-1 ">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default HomeLayout;
