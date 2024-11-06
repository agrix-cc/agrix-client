import {Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import PageNotFound from "./pages/404";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Market from "./pages/market";
import Connections from "./pages/connections";
import Profile from "./pages/profile";
import AddListing from "./components/dashboard/addNew";
import {useTheme} from "next-themes";

function App() {

    // Change default theme to light theme
    const {theme, setTheme} = useTheme();
    setTheme('light');

    return (
        <div>
            {/* Routes for pages */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                <Route path="/market" element={<Market/>}/>
                <Route path="/connections" element={<Connections/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/add" element={<AddListing/>}/>

                {/* Default route for 404 page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
