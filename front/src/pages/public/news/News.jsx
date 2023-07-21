import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Spinner } from "flowbite-react";
import i18next from "i18next";

import { ApiClietServices } from "../../../helpers";
const { getter } = new ApiClietServices();

export const News = () => {
  const [news, seNews] = useState({ loading: true, data: [], err: null });

  useEffect(() => {
    getter("news/all?category=yangilik", news, seNews);
  }, []);

  if (news.loading)
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
    <div className="container mx-auto w-[90%] py-10">
      <h1 className="text-center text-3xl font-semibold mb-10">Yangiliklar</h1>
      <div className="grid grid-cols-3 gap-20 max-md:grid-cols-1">
        {news.data.slice(0, 9).map((item) => (
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
  );
};
