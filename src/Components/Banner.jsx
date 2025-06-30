import React from 'react';
import banner_bg from '/banner.jpg' ;


const Banner = () => {
    const bannerStyle = {
        backgroundImage: `url(${banner_bg})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        
    }

    // const fontStyle={
    //     color: 'white',
    //     padding: "100px 0",
    //     textAlign:" center",
    //     fontSize: "60px"
    //     // marginTop:'200px'
       
    // }
    return (
        <div className=''>
            <div style={bannerStyle} >

            <div className='center pt-40 text-center text-slate-100 '>
               <div>
               <h1 className='font-bold text-5xl mb-7'>Event Manager</h1>
                
                <p className='font-bold'> Host and Join Any Events Absolutely At No Costs... </p>
                
               </div>
        
                </div>

            </div>
        </div>
    );
};

export default Banner;