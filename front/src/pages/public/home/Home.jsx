import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Spinner, Card } from "flowbite-react";
import i18next from "i18next";

import { ApiClietServices } from "../../../helpers"
const { getter } = new ApiClietServices()

export const Home = () => {
  const [data, seData] = useState({ loading: true, data: [], err: null });
  const [news, seNews] = useState({ loading: true, data: [], err: null });

  useEffect(() => {
    getter("banner/get/all", data, seData);
    getter("news/all?category=yangilik", news, seNews);
  }, []);

  if (data.loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner
          aria-label="Extra large spinner example"
          size="xl"
          className=""
        />
      </div>
    );
  return (
    <div className="flex flex-col gap-10 mb-10">
      <div className="w-full h-[500px]">
        <Carousel slideInterval={5000}>
          {data.data.map((item) => (
            <div key={item?._id} className="h-[500px] max-md:h-screen">
              <img
                src={`https://backend.tkti.uz/${item?.banner_img}`}
                alt={item?.title}
                loading="lazy"
                className="object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="container mx-auto w-[90%]">
        <h1 className="text-center text-3xl font-semibold mb-10">
          Yangiliklar
        </h1>
        <div className="grid grid-cols-3 gap-20">
          {news.data.slice(0,9).map((item) => (
            <Link to={`/${i18next.language}/news/details/${item?._id}`}>
              <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={`https://backend.tkti.uz/${item?.photo}`}
                className=""
              >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-20">
                  <p className="line-clamp-2">
                    {item[`title_${i18next.language}`]}
                  </p>
                </h5>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
