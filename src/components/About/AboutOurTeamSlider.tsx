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
    </>
  )
}
export default AboutOurTeamSlider
