import {Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import PageNotFound from "./pages/404";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPas from "./pages/forgotpassword"
import VerifyCode from "./pages/verifycode"
import ResetPas from "./pages/passwordreset"
import Market from "./pages/market";
import FlashSalesPage from "./pages/FlashSalesPage";
import Dashboard from "./pages/dashboard";
import AddListing from "./pages/dashboard/addNew";
import {useTheme} from "next-themes";
import ItemView from "./pages/itemView";
import {useEffect} from "react";
import Onboarding from "./pages/onboarding";
import {AdminProtected, GuestUserRoutes, ProtectedRoutes} from "./components/protectedRoutes";
import Checkout from "./pages/checkout";
import RentTransport from "./pages/rentTransport";
import UserProfile from "./pages/userProfile";
import AdminDashboard from "./pages/admin/dashboard.";
import UserManagements from "./pages/admin/components/users";
import ListingManagement from "./pages/admin/components/listings";
import AdminHome from "./pages/admin/components/home";
import Profile from "./pages/dashboard/profile";
import Listings from "./pages/dashboard/listings";
import ViewUsers from "./pages/dashboard/viewusers";
import Purchases from "./pages/dashboard/purchases";
import Reports from "./components/dashboard/reports";
import Orders from "./pages/dashboard/orders";
import Messages from "./pages/dashboard/messages";
function App() {

    // Change default theme to light theme
    const {setTheme} = useTheme();

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    return (
        <div>
            {/* Routes for pages */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route element={<GuestUserRoutes/>}>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/forgotpassword" element={<ForgotPas/>}/>
                    <Route path="/verifycode" element={<VerifyCode/>}/>
                    <Route path="/passwordreset" element={<ResetPas/>}/>
                    <Route path="/onboarding" element={<Onboarding/>}/>
                </Route>

                <Route path="/market/:category?" element={<Market/>}/>

                <Route path="/product/:id" element={<ItemView/>}/>

                {/*Protected routes*/}
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/dashboard" element={<Dashboard/>}>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="listings" element={<Listings/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="purchases" element={<Purchases/>}/>
                        <Route path="messages" element={<Messages/>}/>
                        <Route path="add" element={<AddListing/>}/>
                        <Route path="reports" element={<Reports/>}/>
                        <Route path="viewusers" element={<ViewUsers />} />
                    </Route>
                    <Route path="/add" element={<AddListing/>}/>
                    <Route path="/edit/:id" element={<AddListing/>}/>
                    <Route path="/flash-sales" element={<FlashSalesPage />} />


                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/rent-transport" element={<RentTransport/>}/>
                    <Route path="/profile/:userId" element={<UserProfile/>}/>
                </Route>

                <Route element={<AdminProtected/>}>
                    <Route path="/admin" element={<AdminDashboard/>}>
                        <Route path="users" element={<UserManagements/>}/>
                        <Route path="listings" element={<ListingManagement/>}/>
                        <Route path="home" element={<AdminHome/>}/>
                    </Route>
                </Route>

                {/* Default route for 404 page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
