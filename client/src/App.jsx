import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import AddProjects from "./components/AddProjects";
import Card from "./components/Card";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

import Navbar from "./components/Navbar";
import SelectApp from "./components/SelectApp";
import "./index.css";
import { auth } from "../Firebase/Firebase";
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements } from "react-router-dom";
import { connectedCredentials } from "../Store/Variables";
import { onAuthStateChanged } from "firebase/auth";
import DashBoard from "./components/DashBoard";
import Payment from "./components/Payment";
import Contact from "./components/Contact";
import Error from "./components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Nav />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/projectsection" element={<AddProjects />} />
      <Route path="/pricing" element={<Payment />} />
      <Route path="/contactus" element={<Contact />} />
      <Route path="/addprojectsection" element={<DashBoard />} />
      
      <Route path="*" element={<Error />} />

    </Route>
  )
)


function App() {
  const setUserCredentials = useSetRecoilState(connectedCredentials);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = await auth.currentUser.getIdToken();
        // console.log(user.photoURL);
        setUserCredentials({
          name: user.photoURL,
          token: id
        })
      } else {

        setUserCredentials({
          name: null,
          token: null
        })
      }
    });

  }, []);

  return (
    <>
      {/* <LandingPage /> */}
      {/* <AddProjects /> */}
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
function LandingPage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Card />
      <Demo />
      {/* <Footer /> */}
    </>
  );
}
function Nav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
