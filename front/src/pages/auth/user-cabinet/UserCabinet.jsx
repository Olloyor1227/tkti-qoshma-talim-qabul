import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Spinner,
  Modal,
  Label,
  FileInput,
  Button,
  Alert,
} from "flowbite-react";
import { jsPDF } from "jspdf";
import copy from "copy-to-clipboard";
import i18next from "i18next";

import logo from "../../../assets/images/copy.png";

import { useAppContext } from "../../../context/app.context";
import { ApiClietServices, imgBaseURL } from "../../../helpers";
import { useLocalStorage } from "../../../hooks";
const { patch, get } = new ApiClietServices();

export const UserCabinet = () => {
  const navigate = useNavigate();
  const pdf = useRef();
  const { setAuthContext } = useAppContext();
  const { getItem } = useLocalStorage();
  const [userData, setUserData] = useState({
    loading: true,
    data: {},
    err: null,
  });
  const [modal, setModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const payForApplication = (e) => {
    e.preventDefault();

    const user = getItem("user", true);

    const data = { ...userData.data };
    delete data.__v;
    delete data._id;
    delete data.updatedAt;
    delete data.createdAt;
    delete data.paid_file;

    const frData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        frData.append(key, value);
      }
    }
    frData.append("file", e.target.paid_file.files[0]);

    patch(`application/${user?._id}`, frData, true)
      .then((res) => {
        console.log(res, "res");
        alert(res?.message);
        location.reload();
      })
      .catch((err) => console.log(err, "err"));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = getItem("user", true);

      const res = await get(`application/${user?._id}`);

      if (res?.success) {
        setUserData({ loading: false, data: res?.data, err: false });
      } else {
        setUserData({ loading: false, data: {}, err: true });
        localStorage.clear();
        location.reload();
        alert("Login yoki parol xato");
        navigate(`/${i18next.language}/login`);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const temp = setTimeout(() => {
      setAlertMsg(false);
    }, 2000);

    return () => clearTimeout(temp);
  }, [alertMsg]);

  const handleGeneratePdf = () => {
    const doc = new jsPDF("p", "pt", "a4", true);

    // Adding the fonts.
    doc.setFont("Times New Roman", "normal", 300);
    doc.setFontSize(10);
    doc.html(pdf.current, {
      callback: () => {
        doc.save("document");
      },
      margin: 20,
    });
  };

  if (userData.loading)
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
    <>
      {/* UPLOAD PAID FILE MODAL */}
      <Modal dismissible show={modal} onClose={() => setModal(false)}>
        <Modal.Header>Arizani faollashtirish</Modal.Header>
        <Modal.Body>
          <form onSubmit={payForApplication}>
            <div className="max-w-md mb-5" id="fileUpload">
              <div className="mb-2 block">
                <Label
                  htmlFor="file"
                  value="To'lov kvitansiyasining rasmini yuklang"
                />
              </div>
              <FileInput
                helperText="Yuklangan rasm sifatli bo'lishi kerak, bu sizning arizangizni faollashtirishda muhim"
                id="file"
                name="paid_file"
                accept=".png, .jpg, .jpeg"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-800">
                Faollashtirish
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* PDF DUCUMENT MODAL */}
      <Modal dismissible show={pdfFile} onClick={() => setPdfFile(false)}>
        <Modal.Body>
          {/* begin::FOR PDF */}
          <div className="flex flex-col gap-10 w-[550px]" ref={pdf}>
            {/* PERSONAL INFO */}
            <div className="flex gap-10">
              <div className="w-52 h-52">
                <img
                  className="w-full h-full object-cover"
                  src={imgBaseURL + userData.data?.photo ?? ""}
                  // src={
                  //   "https://res.cloudinary.com/practicaldev/image/fetch/s--X3HaIj2Q--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/66386/e0232f6f-c5c0-47ae-98b9-3ba363275a4f.jpeg"
                  // }
                  alt="3x4 img"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">Ismi:</span>{" "}
                  <b>{userData.data?.name}</b>{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">Familiyasi:</span>{" "}
                  <b>{userData.data?.surname}</b>{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">Otasining ismi:</span>{" "}
                  <b>{userData.data?.fathername}</b>{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">Tug'ilgan sanasi:</span>{" "}
                  <b>{userData.data?.dob}</b>{" "}
                </p>
                {/* <p className="flex">
                {" "}
                <span className="text-gray-400">Jinsi:</span>{" "}
                <b>{userData.data?.gender}</b>{" "}
              </p> */}
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">JSHSHR:</span>{" "}
                  <b>{userData.data?.jshshr}</b>{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">
                    Passport seriyasi va raqami:
                  </span>{" "}
                  <b>{userData.data?.passport_number}</b>{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="text-gray-400">
                    Passport amal qilish muddati:
                  </span>{" "}
                  <b>{userData.data?.passport_dob}</b>{" "}
                </p>
              </div>
            </div>

            {/* EDUCATION INFO */}
            <div className="flex flex-col justify-between gap-10">
              <div className="flex flex-col gap-2">
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Tugatgan OTM:</span>{" "}
                  <b>{userData.data?.complated_edu}</b>{" "}
                </p>
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Davlati:</span>{" "}
                  <b>{userData.data?.state}</b>{" "}
                </p>
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Talim turi:</span>{" "}
                  <b>{userData.data?.edu_type}</b>{" "}
                </p>
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Talim tili:</span>{" "}
                  <b>{userData.data?.edu_lang}</b>{" "}
                </p>
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Tali darajasi:</span>{" "}
                  <b>{userData.data?.edu_degree}</b>{" "}
                </p>
                <p className="flex gap-5">
                  {" "}
                  <span className="text-gray-400">Fakulteti:</span>{" "}
                  <b>{userData.data?.faculty}</b>{" "}
                </p>
              </div>

              <span className="text-gray-400">Tolo'v cheki:</span>
              <div className="w-full h-36">
                <img
                  className="w-full h-full object-cover"
                  src={imgBaseURL + userData.data?.photo ?? ""}
                  // src={
                  //   "https://res.cloudinary.com/practicaldev/image/fetch/s--X3HaIj2Q--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/66386/e0232f6f-c5c0-47ae-98b9-3ba363275a4f.jpeg"
                  // }
                  alt="3x4 img"
                />
              </div>
            </div>
          </div>
          {/* end::FOR PDF */}
          <Modal.Footer>
            <div className="flex gap-5">
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-800"
                onClick={() => handleGeneratePdf()}
              >
                Yuklash
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-800"
                onClick={() => setPdfFile(false)}
              >
                Bekor qilish
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>

      <div className="container mx-auto w-[90%] py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold ">Shaxsiy ma’lumotlar</h1>
          {userData.data.paid_file ? (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-800"
              onClick={() => setPdfFile(true)}
            >
              Varaqani yuklab olish
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-800"
              onClick={() => setModal(true)}
            >
              Faollashtirish
            </Button>
          )}
        </div>
        <div className="flex gap-20 items-start max-md:flex-col">
          {/* Img and status section */}
          <div className="">
            <div className="w-44 h-56 border shadow-sm relative">
              <img
                className="w-full h-full object-cover"
                src={imgBaseURL + userData.data?.photo ?? ""}
                alt="3x4 img"
              />
              <span
                className={`absolute -bottom-1 left-0 rounded-lg px-4 py-1 text-white text-[13px] ${
                  userData.data.paid_file ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {userData.data.paid_file ? "Faol" : "Nofaol"}
              </span>
            </div>
            <p className="mt-7 text-gray-400 mb-2">
              To'lov qilish uchun hisob raqam
            </p>
            <div className="relative border-2 rounded-lg p-3">
              <b className="">4001 1086 0262 7770 9410 0079 002</b>
              <button
                className="absolute -right-2 -top-3"
                onClick={() => {
                  copy("4001 1086 0262 7770 9410 0079 002");
                  setAlertMsg(true);
                }}
              >
                <img src={logo} alt="" />
              </button>
            </div>
            <p
              className={`${
                alertMsg ? "opacity-1" : "opacity-0"
              } duration-150 p-2 bg-green-300 text-center text-white my-3`}
            >
              Nusxalandi
            </p>
            <Alert color="failure" className="w-72">
              <span>
                <p>
                  <p className="font-medium mb-1 text-lg">Ogohlantirish</p>
                  <br />
                  Yuqoridagi hisob raqamga to'lov qilgandan so'ng <br />
                  to'lov chekini <b>Faollashtirish</b> tugmasini bosish
                  orqali platformaga yuklang
                </p>
              </span>
            </Alert>
          </div>

          {/* User details info section */}
          <div className="flex-1">
            <div className="flex gap-10 mb-5 max-md:flex-col">
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">JSHSHR</span>{" "}
                <b>{userData.data?.jshshr}</b>{" "}
              </p>
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">
                  Passpoer seriyasi va raqami
                </span>{" "}
                <b>{userData.data?.passport_number}</b>{" "}
              </p>
            </div>

            <div className="flex gap-10 mb-5 max-md:flex-col">
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Ismi</span>{" "}
                <b>{userData.data?.name}</b>{" "}
              </p>
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Tug'ilgan sanasi</span>{" "}
                <b>{userData.data?.dob}</b>{" "}
              </p>
            </div>

            <div className="flex gap-10 mb-5 max-md:flex-col">
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Familiyasi</span>{" "}
                <b>{userData.data?.surname}</b>{" "}
              </p>
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Jinsi</span>{" "}
                <b>{userData.data?.gender}</b>{" "}
              </p>
            </div>

            <div className="flex gap-10 mb-5 max-md:flex-col">
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Otasining ismi</span>{" "}
                <b>{userData.data?.fathername}</b>{" "}
              </p>
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">
                  Passport berlgan sana
                </span>{" "}
                <b>{userData.data?.passport_dob}</b>{" "}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Manzili</span>{" "}
                <b>{userData.data?.address}</b>{" "}
              </p>
              <p className="flex flex-col">
                {" "}
                <span className="text-gray-400">Telefoni</span>{" "}
                <b>{userData.data?.tel}</b>{" "}
              </p>
            </div>

            <hr className="border border-dashed border-black my-10" />

            <div className="flex gap-20 max-md:flex-col">
              <div className="flex flex-col gap-4">
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Tugatgan OTM</span>{" "}
                  <b>{userData.data?.complated_edu}</b>{" "}
                </p>
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Davlati</span>{" "}
                  <b>{userData.data?.state}</b>{" "}
                </p>
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Talim turi</span>{" "}
                  <b>{userData.data?.edu_type}</b>{" "}
                </p>
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Talim tili</span>{" "}
                  <b>{userData.data?.edu_lang}</b>{" "}
                </p>
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Tali darajasi</span>{" "}
                  <b>{userData.data?.edu_degree}</b>{" "}
                </p>
                <p className="flex flex-col">
                  {" "}
                  <span className="text-gray-400">Fakulteti</span>{" "}
                  <b>{userData.data?.faculty}</b>{" "}
                </p>
              </div>
              {userData.data?.paid_file ? (
                <div className="w-full h-auto">
                  <h1 className="text-gray-400 mb-2">To'lov kvitansiyasi</h1>
                  <img
                    className="object-cover"
                    src={imgBaseURL + userData.data?.photo ?? ""}
                    alt="Paid check img"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
