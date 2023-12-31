import { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Radio,
  Textarea,
  Select,
} from "flowbite-react";

import { DropZoneIcon, EditIcon } from "../../../assets/icons";

import { ApiClietServices } from "../../../helpers";
const { post, get } = new ApiClietServices();

export function Application() {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [data, setData] = useState({ loading: false, msg: "" });
  const [eduDetails, setEduDetails] = useState({});
  const [direction, setDirection] = useState([]);

  const types = ["Kunduzgi", "Kechki", "Sirtqi"];
  const degrees = ["Bakalavriyat", "Magistratura"];
  const counteries = ["Latviya", "Turkiya", "Belorusiya", "Ozarbayjon"];
  const languages = ["Ingliz", "Rus", "Ingliz-Turk"];

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setEduDetails((prev) => ({ ...prev, [name]: value }));
  };

  const changeHandler = (e) => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ loading: true });

    const formData = new FormData(e.target);
    const res = await post("application/add", formData, true);
    if (res.success) {
      alert(res?.message);
      setData({ loading: false, msg: res?.message });
    } else {
      setData({ loading: false, msg: res?.message });
      alert(res?.message);
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const getByParams = async (params) => {
    const res = get(`filter/filter?${params}`)
    return await res
  }

  const [eduType, setEduType] = useState([])
  const [eduLang, setEduLang] = useState([])
  const [eduState, setEduState] = useState([])
  const [eduUniver, setEduUniver] = useState([])
  const [eduDirectoin, setEduDirectoin] = useState([])

  const [eduDatas, setEduDatas] = useState({})

  const getTypes = async (value) => {
    const res = await getByParams(`talim_darajasi=${value}`)
    const newArr = res.data?.map((i) => i.talim_turi)
    setEduType(Array.from(new Set(newArr)));
    setEduDatas({
      ...eduDatas,
      degree: { isSelected: true, value: value }
    })
  }

  const getLang = async (value) => {
    const res = await getByParams(`talim_darajasi=${eduDatas?.degree?.value}&talim_turi=${value}`)
    const newArr = res.data?.map((i) => i.talim_tili);
    setEduLang(Array.from(new Set(newArr)));
    setEduDatas({
      ...eduDatas,
      type: { isSelected: true, value: value }
    })
  }

  const getState = async (value) => {
    const res = await getByParams(`talim_darajasi=${eduDatas?.degree?.value}&talim_turi=${eduDatas?.type?.value}&talim_tili=${value}`)
    const newArr = res.data?.map((i) => i.davlat);
    setEduState(Array.from(new Set(newArr)));
    setEduDatas({
      ...eduDatas,
      lang: { isSelected: true, value: value }
    })
  }

  const getUniver = async (value) => {
    const res = await getByParams(`talim_darajasi=${eduDatas?.degree?.value}&talim_turi=${eduDatas?.type?.value}&talim_tili=${eduDatas?.lang?.value}&davlat=${value}`)
    const newArr = res.data?.map((i) => i.universitet);
    setEduUniver(Array.from(new Set(newArr)));
    setEduDatas({
      ...eduDatas,
      state: { isSelected: true, value: value }
    })
  }

  const getDirection = async (value) => {
    const res = await getByParams(`talim_darajasi=${eduDatas?.degree?.value}&talim_turi=${eduDatas?.type?.value}&talim_tili=${eduDatas?.lang?.value}&davlat=${eduDatas?.state?.value}&universitet=${value}`)
    const newArr = res.data?.map((i) => i.yonalish);
    setEduDirectoin(Array.from(new Set(newArr)));
    setEduDatas({
      ...eduDatas,
      univer: { isSelected: true, value: value }
    })
  }

  return (
    <div className="container mx-auto w-[90%] py-10 relative">
      <form
        className="flex flex-col border border-slate-200 shadow-2xl rounded p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between max-md:flex-col gap-10 mb-10">
          <div className="md:w-1/2 flex flex-col gap-4">
            {/* NAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Ismingizni" />
              </div>
              <TextInput
                name="name"
                id="name"
                placeholder=""
                required
                shadow
                type="text"
              />
            </div>

            {/* SURNAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="surname" value="Familiyangiz" />
              </div>
              <TextInput
                name="surname"
                id="surname"
                required
                shadow
                type="text"
              />
            </div>

            {/* FATHERNAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fathername" value="Otanizning ismi" />
              </div>
              <TextInput
                name="fathername"
                id="fathername"
                required
                shadow
                type="text"
              />
            </div>

            <div className="flex max-md:flex-col gap-10 my-4">
              {/* DOB */}
              <div className="md:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="dob" value="Tug'ilgan sana" />
                </div>
                <TextInput name="dob" id="dob" required shadow type="date" />
              </div>

              {/* GENDER */}
              <fieldset className="flex max-w-md flex-col gap-4" id="radio">
                <legend className="mb-4 font-medium">Jinsni tanlang</legend>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked
                      id="erkak"
                      name="gender"
                      value="male"
                    />
                    <Label htmlFor="erkak">Erkak</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked
                      id="ayol"
                      name="gender"
                      value="fmale"
                    />
                    <Label htmlFor="ayol">Ayol</Label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="flex max-md:flex-col  gap-10">
              {/* PASSPORT NUMBER */}
              <div className="md:w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="passport_number"
                    value="Passport seriyasi va raqami"
                  />
                </div>
                <TextInput
                  name="passport_number"
                  id="passport_number"
                  required
                  shadow
                  type="text"
                  placeholder="AA1234567"
                  maxLength={9}
                />
              </div>

              {/* PASSPORT DOB */}
              <div className="md:w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="passport_dob"
                    value="Passport berilgan sana"
                  />
                </div>
                <TextInput
                  name="passport_dob"
                  id="passport_dob"
                  required
                  shadow
                  type="date"
                />
              </div>
            </div>

            {/* JSHSHR */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="jshshr" value="Jshshr" />
              </div>
              <TextInput
                name="jshshr"
                id="jshshr"
                required
                shadow
                type="number"
                maxLength={14}
              />
            </div>

            {/* ADDRESS */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <Textarea
                name="address"
                id="address"
                placeholder="Address"
                required
                rows={3}
              />
            </div>

            {/* TEL */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tel" value="Telefon" />
              </div>
              <TextInput
                name="tel"
                id="tel"
                required
                shadow
                type="text"
                placeholder="+998991234567"
                maxLength={13}
              />
            </div>
          </div>

          <hr className="border md:border-white border-dashed border-black" />

          <div className="md:w-1/2 flex flex-col gap-4">
            {/* COMPLATED EDU */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="complated_edu" value="Tugatgan ta'lim muassasasi" />
              </div>
              <TextInput
                name="complated_edu"
                id="complated_edu"
                required
                shadow
                type="text"
              />
            </div>

            {/* EDU DEGREE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_degree" value="Talim darajasi" />
              </div>
              <Select
                id="edu_degree"
                required
                shadow
                name="edu_degree"
                onChange={(e) => getTypes(e.target.value)}
              >
                <option value="">
                  ...
                </option>
                {degrees.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* EDU TYPE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_type" value="Talim turi" />
              </div>
              <Select
                id="edu_type"
                required
                shadow
                disabled={!eduDatas?.degree?.isSelected}
                name="edu_type"
                onChange={(e) => getLang(e.target.value)}
              >
                <option value="">
                  ...
                </option>
                {eduType.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* EDU LANG */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_lang" value="Talim tili" />
              </div>
              <Select
                id="edu_lang"
                required
                shadow
                name="edu_lang"
                disabled={!eduDatas?.type?.isSelected}
                onChange={(e) => getState(e.target.value)}
              >
                <option value="">
                  ...
                </option>
                {eduLang.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* STATE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="state" value="Davlat" />
              </div>
              <Select
                id="state"
                required
                shadow
                name="state"
                disabled={!eduDatas?.lang?.isSelected}
                onChange={(e) => getUniver(e.target.value)}
              >
                <option value="">
                  ...
                </option>
                {eduState.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* UNIVERSITET */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="univer" value="Universitet" />
              </div>
              <Select
                id="univer"
                required
                shadow
                name="univer"
                disabled={!eduDatas?.state?.isSelected}
                onChange={(e) => getDirection(e.target.value)}
              >
                <option value="">
                  ...
                </option>
                {eduUniver.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* DIRECTION */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="faculty" value="Ta'lim yo'nalishi" />
              </div>
              <Select
                id="faculty"
                required
                shadow
                name="faculty"
                disabled={!eduDatas?.univer?.isSelected}
              >
                <option value="">...</option>
                {eduDirectoin.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* IMAGE */}
            <div>
              {fileDataURL ? (
                <div className="img-preview-wrapper relative">
                  <img src={fileDataURL} alt="preview" className="border rounded" />
                  <button type="button" className="bg-white p-4 flex items-center justify-center absolute bottom-0 right-0 border" onClick={() => {setFileDataURL(null); setFile(null)} }><EditIcon /></button>
                </div>
              ) : null}
              <div
                className={`flex items-center justify-center w-full ${fileDataURL ? "hidden" : ""}`}>
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <p>3x4 rasm yuklang</p>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <DropZoneIcon />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Yuklash uchun bosing
                      </span>{" "}
                      yoki sudrab olib keling
                    </p>
                  </div>
                  <input
                    name="file"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg"
                    onChange={changeHandler}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" disabled={data.loading}>
          Topshirish
        </Button>
      </form>
    </div>
  );
}
