import { Outlet , Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.styles.scss'
import {ReactComponent as YeshLogo} from '../../assets/navLogo.svg'
import SignIn from "../sign-in/sign-in.component";

const Navigation =()=>{
    return(
      <Fragment>
        <div className="navigation">
                <Link className='logo-container' to='/'>
                <YeshLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                Shop
                </Link>
                <Link className='nav-link' to='/sign-in'>
                Sign In
                </Link>
                </div>
            </div>
         <Outlet />
         <SignIn />
      </Fragment>
    );
  };

  export default Navigation;