import { ClientApiService } from "../../utils/apiClient";
const { add } = new ClientApiService()

const LoginRegister = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      phone: e.target.phone.value,
      passport_number: e.target.passport_number.value,
    };

    const res = await add("application/login", JSON.stringify(user));
    if (res?.success) {
      localStorage.setItem("user", JSON.stringify(res?.data));
      localStorage.setItem("token",res?.token);
      alert(res?.text);
      window.location.reload(false);
      window.location.href = `/`;
    } else {
      alert(res.message ?? res?.data);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="px-4 text-white bg-[#F06D06] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Tkti qo'shma talim</a>
          </div>
          <p className="mt-6 font-normal text-center text-white md:mt-0"></p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Login the Admin panel
          </h3>
          <form
            action="#"
            className="flex flex-col space-y-5 py-20"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-500"
              >
                Phone
              </label>
              <input
                required
                name="phone"
                type="text"
                id="name"
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                required
                name="passport_number"
                type="text"
                id="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#F06D06] rounded-md shadow focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
