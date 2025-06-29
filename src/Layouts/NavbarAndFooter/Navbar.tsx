import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Navbar = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />;
    }

    const handleLogout = async () => oktaAuth.signOut();

    console.log(authState);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Luv 2 Read</span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target="#navbarNavDropdown"
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label="Toggle Navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.accessToken ?
                            <li className='nav-item m-1'>
                                <Link to="/login" type='button' className='btn btn-outline-light'>Sign In</Link>
                            </li>
                            :
                            <li>
                                <button className="btn btn-outline-light" onClick={handleLogout}>Log Out</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};