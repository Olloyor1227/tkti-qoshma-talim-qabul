import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ApiClietServices, time } from "../../../helpers";
const { getterFromTkti } = new ApiClietServices();

import { CalendarIcon } from "../../../assets/icons";
import { Spinner } from "flowbite-react";

export const NewsDetails = () => {
  const { id } = useParams();

  const [news, seNews] = useState({ loading: true, data: {}, err: null });
  
  useEffect(() => {
    getterFromTkti(`news/${id}`, news, seNews);
  }, []);

  console.log(news)

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
    <div className="w-[90%] container mx-auto py-10">
      <div className="w-full flex flex-wrap gap-5">
        <CalendarIcon inner={true} />{" "}
        <span className="font-bold">{time(news.data.date)}</span>
      </div>
      <h1 className="text-4xl font-bold mb-8">
        {news.data?.title_uz}
      </h1>
      <div className="news-details-body"
        dangerouslySetInnerHTML={{
          __html: news.data?.body_uz
        }}
      />
    </div>
  );
};
