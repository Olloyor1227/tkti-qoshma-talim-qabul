import {
  Button,
  Label,
  TextInput,
  Radio,
  Textarea,
  Select,
} from "flowbite-react";

export function Application() {
  return (
    <div className="container mx-auto w-[90%] py-10">
      <form className="flex max-w-md flex-col gap-4">
        {/* NAME */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Ismingizni" />
          </div>
          <TextInput
            id="name"
            placeholder="name@flowbite.com"
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
          <TextInput id="surname" required shadow type="text" />
        </div>

        {/* FATHERNAME */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fathername" value="Otanizning ismi" />
          </div>
          <TextInput id="fathername" required shadow type="text" />
        </div>

        {/* DOB */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dob" value="Tug'ilgan sana" />
          </div>
          <TextInput id="dob" required shadow type="date" />
        </div>

        {/* GENDER */}
        <fieldset className="flex max-w-md flex-col gap-4" id="radio">
          <legend className="mb-4 font-medium">Jinsni tanlang</legend>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Radio defaultChecked id="erkak" name="gender" value="Erkak" />
              <Label htmlFor="erkak">Erkak</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio defaultChecked id="ayol" name="gender" value="Ayol" />
              <Label htmlFor="ayol">Ayol</Label>
            </div>
          </div>
        </fieldset>

        {/* PASSPORT NUMBER */}
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="passport_number"
              value="Passbort seriyasi va raqami"
            />
          </div>
          <TextInput id="passport_number" required shadow type="text" />
        </div>

        {/* PASSPORT DOB */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="passport_dob" value="Passport sana" />
          </div>
          <TextInput id="passport_dob" required shadow type="date" />
        </div>

        {/* JSHSHR */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="jshshr" value="Jshshr" />
          </div>
          <TextInput id="jshshr" required shadow type="number" />
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
          <TextInput id="tel" required shadow type="number" />
        </div>

        {/* COMPLATED EDU */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="complated_edu" value="Tugatgan OTM" />
          </div>
          <TextInput id="complated_edu" required shadow type="text" />
        </div>

        {/* STATE */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="state" value="Davlat" />
          </div>
          <Select id="state" required shadow>
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
          <Select id="edu_type" required shadow>
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
          <Select id="edu_lang" required shadow>
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
          <Select id="edu_degree" required shadow>
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
          <Select id="faculty" required shadow>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <Button type="submit">Topshirish</Button>
      </form>
    </div>
  );
}

