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

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = (e) => {
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
      setData({ loading: false, msg: res?.statusText });
      alert(res?.statusText);
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

            {/* STATE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="state" value="Davlat" />
              </div>
              <Select id="state" required shadow name="state">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>

            {/* EDU TYPE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_type" value="Talim darajasi" />
              </div>
              <Select id="edu_type" required shadow name="edu_type">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>

            {/* EDU LANG */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_lang" value="Talim tili" />
              </div>
              <Select id="edu_lang" required shadow name="edu_lang">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>

            {/* EDU DEGREE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="edu_degree" value="Talim darajasi" />
              </div>
              <Select id="edu_degree" required shadow name="edu_degree">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>

            {/* FACULTY */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="faculty" value="Fakultet" />
              </div>
              <Select id="faculty" required shadow name="faculty">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
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
                      <span className="font-semibold">Yuklash uchun bosing</span> yoki
                      sudrab olib keling
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
              {/* <div className="md:w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="passport_dob"
                    value="Passport berilgan sana"
                  />
                </div>
                <TextInput
                  name="file"
                  id="passport_dob"
                  required
                  shadow
                  type="file"
                />
              </div> */}
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
