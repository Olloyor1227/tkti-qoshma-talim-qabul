import { useEffect, useState } from "react";

import {
  FormHeader,
  SkeletonPost,
} from "../../../components";

import { ClientApiService } from "../../../utils/apiClient";
import { imgBaseURL } from "../../../utils/http";
const { add, get, deleteData } = new ClientApiService();

const getter = async (state, setState) => {
  setState({ ...state, loading: true });
  const res = await get("banner/get/all/");
  if (res?.success) setState({ loading: false, data: res?.data, err: "" });
  else setState({ loading: false, data: [], err: res });
};
const Banner = () => {
  const [status, setStatus] = useState("read");
  const [banner, setBanner] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("banner_img", e.target.banner_img.files[0]);
    
    const res = await add("banner/add", formData, true)
    if (res?.success) {
      alert(res.message)
    } else {
      alert(res.message)
    }
  }

  const deleteBanner = (id) => {
    deleteData(`banner/${id}`)
    .then(() => {alert("O'chirildi ✅"); location.reload()})
    .catch(() => alert("Xatolik yuz berdi") )
  }

  useEffect(() => {
    getter(banner, setBanner);
  }, []);

  console.log(banner)
  let form = (
    <form className="flex flex-col gap-10 px-10" onSubmit={handleSubmit}>
      <div className="flex justify-between gap-10 items-center">
        <div className="flex flex-col w-1/2">
          <label htmlFor="title">Banner name</label>
          <input
            className=" rounded-lg p-2 border border-slate-600"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="banner_img">Choose one picture</label>
          <input
            className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black border border-gray-500 rounded cursor-pointer"
            type="file"
            accept=""
            id="banner_img"
            name="banner_img"
          />
        </div>
      </div>
      <button
        type="submit"
        className="p-2 border border-gray-700 rounded hover:bg-gray-800 hover:text-white w-full"
      >
        Save
      </button>
    </form>
  );

  let fetchedContent = banner?.loading ? (
    [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
  ) : banner?.err ? (
    <h1 className="text-3xl text-center p-10 bg-gray-100">Xatolik yuz berdi</h1>
  ) : (
    <div className="w-full flex flex-wrap gap-y-44 gap-x-4 px-10">
      {banner?.data?.map((item) => (
        <div className="w-80 h-32" key={item._id}>
          <img
            src={imgBaseURL + item.banner_img}
            alt={item.title}
            className="w-80 h-52"
          />
          <p className="bg-gray-100 p-2">{item.title}</p>
          <button
            className="py-2 px-4 bg-red-500  hover:bg-red-400 text-white text-sm w-full"
            onClick={() => {
              const deleteConfirm = confirm("O'chirishni xoxlaysizmi? ⚡");
              deleteConfirm && deleteBanner(item._id);
            }}
          >
            Delete file
          </button>
          <br />
        </div>
      ))}
    </div>
  );

  const content =
    status === "read" ? fetchedContent : status === "create" ? form : null;

  return (
    <div>
      <FormHeader
        title="Banner rasmlari"
        event2="Add"
        handleEvent2={() => setStatus("create")}
        event1="All"
        handleEvent1={() => setStatus("read")}
      />
      {content}
    </div>
  );
};

export default Banner;

