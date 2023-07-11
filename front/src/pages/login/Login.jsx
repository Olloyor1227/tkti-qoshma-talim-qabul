import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import i18next from "i18next";

export function Login() {

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      name: "Okan",
      age: 12,
      number: "-998(99) 123-45-67"
    }
    localStorage.setItem("user", JSON.stringify(user))
    window.location.reload(false)
    window.location.href = `/${i18next.language}/cabinet`
  }
  
  return (
    <div className="container mx-auto w-[90%] py-2">
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            placeholder="name@flowbite.com"
            required
            type="email"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" required type="password" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}