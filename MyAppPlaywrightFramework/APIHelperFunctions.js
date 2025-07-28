import { expect } from "@playwright/test";

export class Helpers {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  getPostResponse = async (baseUrl, endUrl, data, headers = {}) => {
    const res = await this.apiContext.post(`${baseUrl}/${endUrl}`, {
      data,
      headers,
    });
    return res;
  };

  getGetResponse = async (baseUrl, endUrl, headers = {}) => {
    const res = await this.apiContext.get(`${baseUrl}/${endUrl}`, {
      headers,
    });
    return res;
  };

  getPutResponse = async (baseUrl, endUrl, idItem, data, headers = {}) => {
    const res = await this.apiContext.put(`${baseUrl}/${endUrl}/${idItem}`, {
      data,
      headers,
    });
    return res;
  };

  getDeleteResponse = async (baseUrl, endUrl, idItem, headers = {}) => {
    const res = await this.apiContext.delete(`${baseUrl}/${endUrl}/${idItem}`, {
      headers,
    });
    return res;
  };

  handle_response_status = (res, expected_status) => {
    if (res.status() !== expected_status) {
      res.text().then((text) => {
        console.error("Details:", text);
      });
    }
    expect(res.status()).toBe(expected_status);
  };
}
