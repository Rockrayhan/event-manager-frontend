import React from 'react';
import Banner from '../Components/Banner';
import Types from '../Components/Types';
import TopBloggers from '../Components/TopBloggers';
import Categories from '../Components/Categories';
import Subscribe from '../Components/Subscribe';

const Home = () => {
    return (
        <div>
          <Banner/>
          <Categories/>
          <Types/>
          <TopBloggers/>
          <Subscribe/>
        </div>
    );
};

export default Home;