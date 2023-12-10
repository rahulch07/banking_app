import React from 'react';


const Navbar = () => {
  

  return (
    <div >
        <div className='nav'>Banking App</div>
        <ul className='menu'>
            <li>
                <a href='/login'>Customer Login</a>
            </li>
            <li><a href='/banker-login'>Banker Login</a></li>
        </ul>
    </div>
  );
}
export default Navbar;
