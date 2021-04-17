import { getAdds } from "../utils/googleExcel";
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';

SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

export default function Adds(props) {
  const [addElements, setAddElements] = useState([]);
  const swiperRef = useRef();
  const addToElement = (addDoc) => {
    return (
      <SwiperSlide key={addDoc.img}>
        <a href={addDoc.url} target="_blank">
          <img style={{maxWidth:'100%', maxHeight:'100%'}} src={addDoc.img}></img>
        </a>
      </SwiperSlide>
    );
  };

  useEffect(async ()=>{
    const adds = await getAdds();
    const result = adds.map(addToElement);
    setAddElements(result);
    global.swiper = swiperRef.current.swiper;
    return ()=>{
      global.swiper = null;
    }
  }, []);


  return (
    <div className="addsRoot">
      <Swiper
        ref={swiperRef}
        navigation
        pagination
        loop={true}
        autoplay
        spaceBetween={0}
        slidesPerView={props.isMobile?1:2}
      >
        {addElements}
      </Swiper>
    </div>

  );
};