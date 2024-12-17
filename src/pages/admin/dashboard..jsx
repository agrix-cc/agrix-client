import {NavLink, Outlet} from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div>
            <p>This is admin dashboard</p>
            <nav>This is navigation bar</nav>
            <div className="flex justify-between">
                <div className="bg-sage-green">
                    <ul>
                        <li>
                            <NavLink to="home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="listings">Listing</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
};