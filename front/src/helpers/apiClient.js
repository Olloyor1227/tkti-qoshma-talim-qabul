import { http, fetchApi } from "../helpers";

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

export class ApiClienrServices {
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

  delete(url) {
    const headers = {
      "Content-type": "application/json",
      Token: localStorage.getItem("token"),
    };
    const method = "DELETE";

    return fetchApi(url, { headers: headers, method: method });
  }
}

export default new ClientApiService();
