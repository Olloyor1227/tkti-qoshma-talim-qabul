import { fetchApi } from "./http";

export class ClientApiService {
  getter = async (url, state, setState) => {
    setState({ ...state, loading: true });
    const res = await (
      await fetch(`https://backend.tkti.uz/${url}`, {
        headers: { "Content-type": "application/json" },
      })
    ).json();
    if (res?.success) setState({ loading: false, data: res?.data, err: "" });
    else setState({ loading: false, data: [], err: "Server bilan xatolik" });
  };
  
  get(url) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    return fetchApi(url, { headers: headers });
  }

  add(url, data, type) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const headersSecond = {
      Token: localStorage.getItem("token"),
    };
    const method = "POST";

    return fetchApi(url, {
      method: method,
      headers: type ? headersSecond : headers,
      body: data,
    });
  }

  update(url, data, type) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const headersSecond = {
      Token: localStorage.getItem("token"),
    };
    const method = "PUT";

    return fetchApi(url, {
      method: method,
      headers: type ? headersSecond : headers,
      body: data,
    });
  }

  deleteData(url) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const method = "DELETE";

    return fetchApi(url, { headers: headers, method: method });
  }
}