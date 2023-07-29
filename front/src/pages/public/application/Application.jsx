import { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Radio,
  Textarea,
  Select,
} from "flowbite-react";

import { DropZoneIcon } from "../../../assets/icons";

import { ApiClietServices } from "../../../helpers";
const { post } = new ApiClietServices();

export function Application() {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [data, setData] = useState({ loading: false, msg: "" });
  const [eduDetails, setEduDetails] = useState({});
  const [direction, setDirection] = useState([]);

  const types = ["Kunduzgi", "Kechki", "Sirtqi"];
  const degrees = ["Bakalavriyat", "Magistratutra"];
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

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
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

  useEffect(() => {
    if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Bakalavriyat" &&
      eduDetails?.state === "Latviya" &&
      eduDetails?.edu_lang === "Ingliz"
    )
      setDirection([
        "Oziq-ovqat texnologiyasi (mahsulot turlari bo'yicha)",
        "Iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
      ]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Bakalavriyat" &&
      eduDetails?.state === "Turkiya" &&
      eduDetails?.edu_lang === "Ingliz-Turk"
    )
      setDirection([
        "Texnologik jarayonlarni boshqarishning axborot – kommunikasiya tizimlari",
      ]);
    else if (
      eduDetails?.edu_type === "Sirtqi" &&
      eduDetails?.edu_degree === "Bakalavriyat" &&
      eduDetails?.state === "Belorusiya" &&
      eduDetails?.edu_lang === "Rus"
    )
      setDirection([
        "Oziq-ovqat texnologiyasi (don mahsulotlari)",
        "Kimyoviy texnologiya (ishlab chiqarish turlari bo'yicha)",
      ]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Bakalavriyat" &&
      eduDetails?.state === "Belorusiya" &&
      eduDetails?.edu_lang === "Rus"
    )
      setDirection([
        "Texnologik mashinalar va jihozlar (tarmoqlar bo'yicha)",
        "Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish (tarmoqlar bo'yicha)",
        "Biotexnologiya (oziq-ovqat, ozuqa, kimyoviy mahsulotlar va qishloq xo'jaligi)",
        "Menejment (kimyo va oziq-ovqat sanoati)",
      ]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Magistratutra" &&
      eduDetails?.state === "Latviya" &&
      eduDetails?.edu_lang === "Ingliz"
    )
      setDirection([
        "Biznesni boshqarish (Master of Business Administration-MBA)",
        "Oziq-ovqat mahsulotlarini ishlab chiqarish va qayta ishlash texnologiyasi (mahsulot turlari bo'yicha)",
        "Biotexnologiya (oziq-ovqat, ozuqa, kimyoviy mahsulotlar va qishloq xo'jaligi)",
        "Menejment (kimyo va oziq-ovqat sanoati)",
      ]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Magistratutra" &&
      eduDetails?.state === "Turkiya" &&
      eduDetails?.edu_lang === "Ingliz-Turk"
    )
      setDirection([
        "Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish (tarmoqlar bo'yicha)",
      ]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Magistratutra" &&
      eduDetails?.state === "Ozarbayjon" &&
      eduDetails?.edu_lang === "Ingliz"
    )
      setDirection(["Kimyoviy va neft-gazkimyoviy texnologiyalar"]);
    else if (
      eduDetails?.edu_type === "Kunduzgi" &&
      eduDetails?.edu_degree === "Magistratutra" &&
      eduDetails?.state === "Belorusiya" &&
      eduDetails?.edu_lang === "Rus"
    )
      setDirection([
        "Menejment (tarmoqlar va sohalar)",
        "Marketing (tarmoqlar va sohalar)",
        "Kimyoviy texnologiya jarayonlari va apparatlari (ishlab chiqarish turi bo'yicha)",
        "Yog'ochga ishlov berish texnologiyasi va yog'ochshunoslik",
        "Oziq-ovqat mahsulotlarini ishlab chiqarish va qayta ishlash texnologiyasi (mahsulot turlari bo'yicha)",
        "Atrof muhit muhofazasi (tarmoqlar va sohalar bo'yicha)",
      ]);
    else setDirection([]);
  }, [eduDetails]);

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
                <Label htmlFor="complated_edu" value="Tugatgan OTM" />
              </div>
              <TextInput
                name="complated_edu"
                id="complated_edu"
                required
                shadow
                type="text"
              />
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
                name="edu_type"
                onChange={handleSelect}
              >
                <option value="" hidden>
                  ...
                </option>
                {types.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
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
                onChange={handleSelect}
              >
                <option value="" hidden>
                  ...
                </option>
                {degrees.map((item, id) => (
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
                onChange={handleSelect}
              >
                <option value="" hidden>
                  ...
                </option>
                {counteries.map((item, id) => (
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
                onChange={handleSelect}
              >
                <option value="" hidden>
                  ...
                </option>
                {languages.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* FACULTY */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="faculty" value="Fakultet" />
              </div>
              <Select id="faculty" required shadow name="faculty">
                <option value="">...</option>
                {direction.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            {/* IMAGE */}
            <div>
              {fileDataURL ? (
                <p className="img-preview-wrapper">
                  {<img src={fileDataURL} alt="preview" />}
                </p>
              ) : null}
              <div
                className={`flex items-center justify-center w-full ${
                  fileDataURL ? "hidden" : ""
                }`}
              >
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
