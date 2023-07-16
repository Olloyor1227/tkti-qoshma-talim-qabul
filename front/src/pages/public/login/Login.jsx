import { Button, Label, TextInput, Spinner } from "flowbite-react";
import i18next from "i18next";
import { useState } from "react";

import { ApiClietServices } from "../../../helpers";

export function Login() {
  const { post } = new ApiClietServices();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      phone: e.target.phone.value,
      passport_number: e.target.passport_number.value,
    };

    setLoading(true);

    const res = await post("application/login", JSON.stringify(user));
    if (res?.success) {
      setLoading(false);
      setText(res?.text);
      localStorage.setItem("user", JSON.stringify(res?.data));
      localStorage.setItem("token",res?.token);
      window.location.reload(false);
      window.location.href = `/${i18next.language}/cabinet`;
    } else {
      setLoading(false);
      setText(res?.statusText);
    }
  };

  return (
    <div className="container mx-auto w-[90%] py-10">
      <form
        className="flex max-w-md flex-col gap-4 bg-white border border-slate-200 shadow-2xl p-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-medium text-center">Kirish </h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Telefon raqam" />
          </div>
          <TextInput
            id="phone"
            placeholder="+998999999999"
            required
            type="text"
            name="phone"
            maxLength={13}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="passport_number"
              value="Pasport seriyasi va raqami"
            />
          </div>
          <TextInput
            id="passport_number"
            required
            type="text"
            name="passport_number"
            placeholder="AA1234567"
            maxLength={9}
          />
        </div>
        <Button type="submit" className="" disabled={loading}>
          {loading ? <Spinner aria-label="Default status example" /> : "Kirish"}
        </Button>
        {text ? (
          <p className="text-red-500 py-4 text-center font-bold">{text}</p>
        ) : null}
      </form>
    </div>
  );
}
