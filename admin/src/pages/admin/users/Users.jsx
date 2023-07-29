import { useEffect, useState } from "react";

import {
  ModalWrapper,
  Form,
  FormHeader,
  SkeletonPost,
  Table,
} from "../../../components";
import { DeleteIcon, EditIcon } from "../../../assets/icons";

import { ClientApiService } from "../../../utils/apiClient";
import { imgBaseURL } from "../../../utils/http";
const { add, get, update } = new ClientApiService();

const getter = async (state, setState) => {
  setState({ ...state, loading: true });
  const res = await get("application/");
  if (res?.success) setState({ loading: false, data: res?.data, err: "" });
  else setState({ loading: false, data: [], err: "Server bilan xatolik" });
};

const Users = () => {
  const [status, setStatus] = useState("read");
  const [onEdit, setOnEdit] = useState("");
  const [news1, setNews1] = useState({});

  useEffect(() => {
    getter(news1, setNews1);
  }, []);

  const analyseNameTableHead = [
    "T/r",
    "Rasm",
    "Ism",
    "Passport seriya",
    "Telefon",
    "Status",
    "Amallar",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => {
    return (
      <tr key={index} className="cursor-pointer hover:bg-gray-100">
        <td>{index + 1}</td>
        <td className="flex items-center justify-center">
          <img
            src={imgBaseURL + item.photo}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-full"
          />
        </td>
        <td>
          {item.name} {item.surname}
        </td>
        <td>{item.passport_number}</td>
        <td>{item.tel}</td>
        <td>
          <span
            className={`${
              item?.paid_file ? "bg-green-400" : "bg-red-600"
            } text-white p-2 rounded-lg`}
          >
            {item?.paid_file ? "Faol" : "Nofaol"}
          </span>
        </td>
        <td className="border-red-400">
          <div className="flex items-center justify-center">
            <button
              className="mr-4 hover:scale-125"
              onClick={() => {
                setOnEdit({ open: true, obj: item });
              }}
            >
              <EditIcon />
            </button>
            <button
              className="hover:scale-125"
              onClick={() => {
                const deleteConfirm = confirm(
                  "Malumotni o'chirishga tayyormisiz? ⚠"
                );
              }}
            >
              <span className="">
                <DeleteIcon />
              </span>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  let content = null;
  let fetchedContent = news1?.loading ? (
    [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
  ) : news1?.err ? (
    <h1 className="text-3xl text-center p-10 bg-gray-100">Xatolik yuz berdi</h1>
  ) : (
    <div className="px-10">
      <Table
        headData={analyseNameTableHead}
        renderHead={renderHead}
        bodyData={news1?.data ?? []}
        renderBody={renderBody}
        limit={10}
      />
    </div>
  );

  let formData = news1?.loading ? (
    [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
  ) : (
    <>
      <Form />
    </>
  );

  status === "read"
    ? (content = fetchedContent)
    : status === "create"
    ? (content = formData)
    : (content = null);
  return (
    <div>
      {onEdit.open && (
        <ModalWrapper modalClose={() => setOnEdit({ open: false })}>
          <div>
            <div
              className={`flex gap-10 items-start  max-md:flex-col bg-white border-4 ${
                onEdit.obj.paid_file ? "border-green-400" : "border-red-400"
              } p-4 rounded-xl`}
            >
              {/* Img and status section */}
              <div className="w-72 h-44">
                <img
                  className="w-full h-full object-cover"
                  src={imgBaseURL + onEdit.obj?.photo ?? ""}
                  alt="3x4 img"
                />
                <span
                  className={`rounded-lg px-6 py-2 text-white ${
                    onEdit.obj?.paid_file ? "bg-green-500" : "bg-red-600"
                  }`}
                >
                  {onEdit.obj?.paid_file ? "Faol" : "Nofaol"}
                </span>
              </div>

              {/* User details info section */}
              <div className="flex-1">
                <div className="flex gap-10 mb-5 max-md:flex-col">
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">JSHSHR</span>{" "}
                    <b>{onEdit.obj?.jshshr}</b>{" "}
                  </p>
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">
                      Passpoer seriyasi va raqami
                    </span>{" "}
                    <b>{onEdit.obj?.passport_number}</b>{" "}
                  </p>
                </div>

                <div className="flex gap-10 mb-5 max-md:flex-col">
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Ismi</span>{" "}
                    <b>{onEdit.obj?.name}</b>{" "}
                  </p>
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Tug'ilgan sanasi</span>{" "}
                    <b>{onEdit.obj?.dob}</b>{" "}
                  </p>
                </div>

                <div className="flex gap-10 mb-5 max-md:flex-col">
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Familiyasi</span>{" "}
                    <b>{onEdit.obj?.surname}</b>{" "}
                  </p>
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Jinsi</span>{" "}
                    <b>{onEdit.obj?.gender}</b>{" "}
                  </p>
                </div>

                <div className="flex gap-10 mb-5 max-md:flex-col">
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Otasining ismi</span>{" "}
                    <b>{onEdit.obj?.fathername}</b>{" "}
                  </p>
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">
                      Passport amal qilish muddati
                    </span>{" "}
                    <b>{onEdit.obj?.passport_dob}</b>{" "}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Manzili</span>{" "}
                    <b>{onEdit.obj?.address}</b>{" "}
                  </p>
                  <p className="flex flex-col">
                    {" "}
                    <span className="text-gray-400">Telefoni</span>{" "}
                    <b>{onEdit.obj?.tel}</b>{" "}
                  </p>
                </div>

                <hr className="border border-dashed border-black my-10" />

                <div className="flex gap-20 max-md:flex-col">
                  <div className="flex flex-col gap-4">
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Tugatgan OTM</span>{" "}
                      <b>{onEdit.obj?.complated_edu}</b>{" "}
                    </p>
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Davlati</span>{" "}
                      <b>{onEdit.obj?.state}</b>{" "}
                    </p>
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Talim turi</span>{" "}
                      <b>{onEdit.obj?.edu_type}</b>{" "}
                    </p>
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Talim tili</span>{" "}
                      <b>{onEdit.obj?.edu_lang}</b>{" "}
                    </p>
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Tali darajasi</span>{" "}
                      <b>{onEdit.obj?.edu_degree}</b>{" "}
                    </p>
                    <p className="flex flex-col">
                      {" "}
                      <span className="text-gray-400">Fakulteti</span>{" "}
                      <b>{onEdit.obj?.faculty}</b>{" "}
                    </p>
                  </div>
                  {onEdit.obj?.paid_file ? (
                    <div className="w-full h-auto">
                      <h1 className="text-gray-400 mb-2">
                        To'lov kvitansiyasi
                      </h1>
                      <img
                        className="object-cover"
                        src={imgBaseURL + onEdit.obj?.photo ?? ""}
                        alt="Paid check img"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <br />

            {onEdit.obj?.paid_file ? (
              <div className="flex justify-between items-center rounded-xl bg-gray-300 p-4">
                <h1 className="text-2xl">Malumotlar talabga javob beradimi?</h1>
                <div className="flex gap-5">
                  <button className="px-6 py-2 rounded-md bg-green-600 text-white">
                    Ha
                  </button>
                  <button className="px-6 py-2 rounded-md bg-red-600 text-white">
                    Yo'q
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </ModalWrapper>
      )}
      <FormHeader
        title="Arizalar"
        // event2="Add"
        // handleEvent2={() => setStatus("create")}
        event1="Barcha arizalar"
        handleEvent1={() => setStatus("read")}
      />
      {content}
    </div>
  );
};

export default Users;
