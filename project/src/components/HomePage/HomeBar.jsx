import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './HomeBar.css';
import { Link } from 'react-router-dom';
import HomeAppBar from './HomeAppBar';
import HomeAppBarAlt from './HomeAppBarAlt';
import Footer from './Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TypeAnimation } from 'react-type-animation';

export default function HomeBar() {
  const [liked, setLiked] = useState(Array(6).fill(false));
  const handleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const cardsData = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Join the brightest minds in technology and innovation at the Tech Innovation Summit 2024. Explore the latest trends in AI, blockchain, and cybersecurity, and network with industry leaders. This event will feature keynote speakers, panel discussions, and hands-on workshops designed to inspire and educate attendees.",
      url: 'https://media.licdn.com/dms/image/D4E12AQEL9_m5ZrnB6w/article-cover_image-shrink_720_1280/0/1667152480221?e=2147483647&v=beta&t=LZ3OE4tKLKXfYfEJhFzosR7gifkHy6gbG8ml0WoxaKM'
    },
    {
      id: 2,
      title: "Global Music Fest 2024",
      description: "Experience the magic of live music at the Global Music Fest 2024. Featuring artists from around the world, this festival promises a diverse lineup of genres, unforgettable performances, and immersive experiences for all music lovers.",
      url: 'https://static.toiimg.com/photo/msid-95737367,width-96,height-65.cms'
    },
    {
      id: 3,
      title: "Health and Wellness Expo 2024",
      description: "Discover the latest in health and wellness at the Health and Wellness Expo 2024. This event brings together experts in nutrition, fitness, mental health, and holistic wellness to provide attendees with valuable insights and practical tips for a healthier lifestyle.",
      url: 'https://cdn-az.allevents.in/events5/banners/176c39b375490079ac35687f6c076a05c36f0a928a008fd1aaa4b423948ee39d-rimg-w1200-h600-dcfeffff-gmir.jpg?v=1720334382'
    },
    {
      id: 4,
      title: "Future of Sports Conference 2024",
      description: "Explore the future of sports at the Future of Sports Conference 2024. Delve into advancements in sports technology, athlete training, and performance analytics. Join industry professionals, athletes, and researchers in discussions and workshops that shape the future of sports.",
      url: 'https://cdn.prod.website-files.com/5f1af76db47b36e28b98eead/5f731c657a02a677a6868724_5f2b1b974080847fe07ab39e_5f1af9613233f37293e1dea1_.jpg'
    },
    {
      id: 5,
      title: "Culinary Arts Festival 2024",
      description: "Indulge in the Culinary Arts Festival 2024, where food enthusiasts and top chefs come together to celebrate the art of cooking. Enjoy cooking demonstrations, tastings, and culinary workshops that highlight the latest trends and techniques in the culinary world.",
      url: 'https://www.ish.edu.in/info/culinary-fest-2023/asset/img/overview-img-1.jpg'
    },
    {
      id: 6,
      title: "Green Tech Expo 2024",
      description: "Attend the Green Tech Expo 2024 to learn about sustainable technologies and eco-friendly innovations. This event features exhibits on renewable energy, green building, and sustainable living practices, providing a platform for discussions on how to create a greener future.",
      url: 'https://south.euneighbours.eu/wp-content/uploads/2022/08/ecomondo.jpg'
    }
  ];

  return (
    <>
      <div className="mainbox">
        {/* <HomeAppBar /> */}
        <HomeAppBarAlt/>
        <div className="content">
          <div className='typeanimation'>
            <TypeAnimation
              preRenderFirstString={true}
              sequence={[
                500,
                "Upcoming events in Music and Entertainment.",
                1000,
                "Upcoming events in Technology and Innovation.",
                1000,
                "Upcoming events in Health and Wellness.",
                1000,
                "Upcoming events in Sports and Recreation.",
                500,
              ]}
              speed={50}
              style={{ fontSize: '3em', fontWeight: 'bold', fontFamily: 'fantasy' }}
              repeat={Infinity}
              className="type-animation"
            />
          </div>
          <Box className="cards-container">
              {cardsData.map((card, index) => (
                <div key={card.id} className="card" style={{ backgroundImage: `url(${card.url})` }}>
                  <div className="card-content">
                    <h2 className="card-title">{card.title}</h2>
                    <p className="card-body">{card.description}</p>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton 
                        aria-label="like" 
                        onClick={() => handleLike(index)} 
                        sx={{ 
                          backgroundColor: 'white', 
                          marginRight: '8px', 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          overflow: 'hidden',
                          '&:hover': {
                          backgroundColor: 'white', // Prevents changing color on hover
                          }
                        }}
                      >
                        {liked[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <Link to={'/eventdetails'} className="button">Learn more</Link>
                    </Box>
                  </div>
                </div>
              ))}
            </Box>

          <Footer className="footer" />
        </div>
      </div>
    </>
  );
}

