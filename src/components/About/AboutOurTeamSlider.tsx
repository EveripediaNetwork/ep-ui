import React from 'react'
import Carousel from '../Elements/Carousel/Carousel'

interface AboutOurTeamSliderProps {
  children: React.ReactNode
}
const AboutOurTeamSlider = ({ children }: AboutOurTeamSliderProps) => {
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  }
  return (
    <>
      <Carousel topArrow="30%" settings={settings}>
        {children}
      </Carousel>
      <style jsx global>{`
        .about__ourTeamSliderWrapper .slick-slider {
          height: 550px;
        }
        .slick-center .teamMember__about {
          display: block;
        }
        .slick-center .teamMember__image {
          width: 200px;
          height: 200px;
          margin-top: 0;
        }
        @media only screen and (max-width: 820px) {
          .teamMember__about {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
export default AboutOurTeamSlider
