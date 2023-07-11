import { Card } from "flowbite-react";
import i18next from "i18next";
import { Link } from "react-router-dom";

export const News = () => {
  return (
    <div className="container mx-auto w-[90%] py-10">
      <Link to={`/${i18next.language}/news/details/${1}`}>
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://tsue.uz/media/news_gallery/616A9586.jpeg"
          className="w-96"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>Noteworthy technology acquisitions 2021</p>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <p>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </p>
        </Card>
      </Link>
    </div>
  );
};
("use client");
