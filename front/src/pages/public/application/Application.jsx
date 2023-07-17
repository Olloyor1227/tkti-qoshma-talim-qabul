import {
  Button,
  Label,
  TextInput,
  Radio,
  Textarea,
  Select,
} from "flowbite-react";

export function Application() {
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
  }

  return (
    <div className="container mx-auto w-[90%] py-10">
      <form className="flex flex-col border border-slate-200 shadow-2xl rounded p-4" onSubmit={handleSubmit}>
        <div className="flex justify-between max-md:flex-col gap-10 mb-10">
          <div className="md:w-1/2 flex flex-col gap-4">
            {/* NAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Ismingizni" />
              </div>
              <TextInput name="name" id="name" placeholder="" required shadow type="text" />
            </div>

            {/* SURNAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="surname" value="Familiyangiz" />
              </div>
              <TextInput name="surname" id="surname" required shadow type="text" />
            </div>

            {/* FATHERNAME */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fathername" value="Otanizning ismi" />
              </div>
              <TextInput name="fathername" id="fathername" required shadow type="text" />
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
                      value="Erkak"
                    />
                    <Label htmlFor="erkak">Erkak</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked
                      id="ayol"
                      name="gender"
                      value="Ayol"
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
                <TextInput name="passport_number"
                  id="passport_number"
                  required
                  shadow
                  type="text"
                  placeholder="AA1234567"
                />
              </div>

              {/* PASSPORT DOB */}
              <div className="md:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="passport_dob" value="Passport berilgan sana" />
                </div>
                <TextInput name="passport_dob" id="passport_dob" required shadow type="date" />
              </div>
            </div>

            {/* JSHSHR */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="jshshr" value="Jshshr" />
              </div>
              <TextInput name="jshshr" id="jshshr" required shadow type="number" />
            </div>

            {/* ADDRESS */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <Textarea id="address" placeholder="Address" required rows={3} />
            </div>

            {/* TEL */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tel" value="Telefon" />
              </div>
              <TextInput name="tel" id="tel" required shadow type="text" placeholder="+998991234567" />
            </div>
          </div>

          <hr className="border md:border-white border-dashed border-black"/>

          <div className="md:w-1/2 flex flex-col gap-4">
            {/* COMPLATED EDU */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="complated_edu" value="Tugatgan OTM" />
              </div>
              <TextInput name="complated_edu" id="complated_edu" required shadow type="text" />
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
          </div>
        </div>
        <Button type="submit">Topshirish</Button>
      </form>
    </div>
  );
}
