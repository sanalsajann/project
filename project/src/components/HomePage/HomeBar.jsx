import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import './HomeBar.css';
import { Link } from 'react-router-dom';
import HomeAppBarAlt from './HomeAppBarAlt';
import Footer from './Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TypeAnimation } from 'react-type-animation';
import Carousel1 from './Carousel1';

export default function HomeBar() {
  const [liked, setLiked] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4002/eventdeets')
      .then(response => {
        setCardsData(response.data);
        setLiked(Array(response.data.length).fill(false));
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <>
      <Box className='Topbar' sx={{ paddingTop: '2%', zIndex: 1000 }}>
        <HomeAppBarAlt />
      </Box>
      <div className="mainbox">
        <Box sx={{ width: '100%', paddingTop: '4%', zIndex: 10 }}>
          <Carousel1 />
        </Box>
        <Box className='textanimation' sx={{ textAlign: 'center', height: '15rem', backdropFilter: 'blur(10px)', padding: '50px' }}>
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
            style={{ fontSize: '4em', fontWeight: 'bold', fontFamily: 'fantasy', color: 'whitesmoke' }}
            repeat={Infinity}
            className="type-animation"
          />
        </Box>
        <div className="content">
          <div className="cards-container">
            {cardsData.map((card, index) => (
              <div key={card.eid} className="card" style={{ backgroundImage: `url(${card.url})` }}>
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
                    <Link to={`/eventpages/${card.id}`} className="button">Learn more</Link>
                  </Box>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Box sx={{ background: 'var(--clr-neutral-900)', color: 'var(--clr-neutral-100)', padding: '10px', textAlign: 'center', width: '100%', marginBottom: '1%' }}>
          <Footer className="footer" />
        </Box>
      </div>
    </>
  );
}
