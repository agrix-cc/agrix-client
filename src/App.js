import {Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import PageNotFound from "./pages/404";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Market from "./pages/market";
import Connections from "./pages/connections";
import Dashboard from "./pages/dashboard";
import AddListing from "./pages/dashboard/addNew";
import {useTheme} from "next-themes";
import ItemView from "./pages/itemView";
import {useEffect} from "react";
import Onboarding from "./pages/onboarding";
import ProtectedRoutes from "./components/protectedRoutes";
import Checkout from "./pages/checkout";
import RentTransport from "./pages/rentTransport";
import UserProfile from "./pages/userProfile";

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
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>

                <Route path="/market/:category?" element={<Market/>}/>

                <Route path="/product/:id" element={<ItemView/>}/>

                {/*Protected routes*/}
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/add" element={<AddListing/>}/>
                    <Route path="/edit/:id" element={<AddListing/>}/>
                    <Route path="/connections" element={<Connections/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/rent-transport" element={<RentTransport/>}/>
                    <Route path="/profile/:userId" element={<UserProfile />} />
                </Route>

                {/* Default route for 404 page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
