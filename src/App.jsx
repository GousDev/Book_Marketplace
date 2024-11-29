import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "./components/Loader";
import Order from "./components/pages/Order";
const Buyhome = lazy(() => import("./components/buy/Buyhome"));
const Sellhome = lazy(() => import("./components/sell/Sellhome"));
const Nav = lazy(() => import("./components/Nav"));
const Footer = lazy(() => import("./components/Footer"));
const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Signup = lazy(() => import("./components/pages/Signup"));
const Cart = lazy(() => import("./components/pages/Cart"));
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const Story = lazy(() => import("./components/pages/Story"));
const College = lazy(() => import("./components/pages/College"));
const Religious = lazy(() => import("./components/pages/Religious"));
const History = lazy(() => import("./components/pages/History"));
const BookBuy = lazy(() => import("./components/book-component/BookBuy"));
const SellForm = lazy(() => import("./components/sell/SellForm"));
const Catalogue = lazy(() => import("./components/pages/catalogue"));
const Checkout = lazy(() => import("./components/pages/Checkout"));
const Profile = lazy(() => import("./components/pages/Profile"));
const Dashboard = lazy(() => import("./components/admin/components/Dashboard"));
const Products = lazy(() =>
  import("./components/admin/components/Products.jsx")
);
const Addbook = lazy(() => import("./components/admin/components/addBook.jsx"));
const AddUser = lazy(() => import("./components/admin/components/AddUser.jsx"));
const Users = lazy(() => import("./components/admin/components/Users.jsx"));

// Normal user layout
const NormalLayout = ({ children }) => (
  <>
    <Nav />
    {children}
    <Footer />
  </>
);

// Admin layout
const AdminLayout = ({ children }) => <>{children}</>;

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Normal User Routes */}
            <Route
              path="/*"
              element={
                <NormalLayout>
                  <Routes>
                    <Route path="/" element={<Buyhome />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/sell" element={<Sellhome />} />
                    <Route path="/saved-books" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/college" element={<College />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/religious" element={<Religious />} />
                    <Route path="/book-info" element={<BookBuy />} />
                    <Route path="/upload-book" element={<SellForm />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/order" element={<Order />} />
                  </Routes>
                </NormalLayout>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/add-book" element={<Addbook />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add-user" element={<AddUser />} />
                  </Routes>
                </AdminLayout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
