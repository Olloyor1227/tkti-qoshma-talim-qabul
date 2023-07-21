import { http, fetchApi, foreignBaseURL } from "../helpers";

export class ClientApiService {
  get(url) {
    return http.get(url);
  }

  post(url, data) {
    return http.post(url, data);
  }

  put(url, data) {
    return http.put(url, data);
  }

  delete(url) {
    return http.delete(url);
  }
}

export class ApiClietServices {
  getter = async (url, state, setState) => {
    setState({ ...state, loading: true });
    const res = await (
      await fetch(`${foreignBaseURL}${url}`, {
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

  post(url, data, type) {
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

  patch(url, data, type) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const headersSecond = {
      Token: localStorage.getItem("token"),
    };
    const method = "PATCH";

    return fetchApi(url, {
      method: method,
      headers: type ? headersSecond : headers,
      body: data,
    });
  }

  delete(url) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const method = "DELETE";

    return fetchApi(url, { headers: headers, method: method });
  }
}

export default new ApiClietServices();
