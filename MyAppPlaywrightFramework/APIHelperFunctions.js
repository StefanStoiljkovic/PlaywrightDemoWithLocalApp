export class Helpers {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async getPostResponse(baseUrl, endUrl, data, headers = {}) {
    const res = await this.apiContext.post(`${baseUrl}/${endUrl}`, {
      data,
      headers,
    });
    return res;
  }

  async getGetResponse(baseUrl, endUrl, headers = {}) {
    const res = await this.apiContext.get(`${baseUrl}/${endUrl}`, {
      headers,
    });
    return res;
  }

  async getPutResponse(baseUrl, endUrl, idItem, data, headers = {}) {
    const res = await this.apiContext.put(`${baseUrl}/${endUrl}/${idItem}`, {
      data,
      headers,
    });
    return res;
  }

  async getDeleteResponse(baseUrl, endUrl, idItem, headers = {}) {
    const res = await this.apiContext.delete(`${baseUrl}/${endUrl}/${idItem}`, {
      headers,
    });
    return res;
  }

  async handle_wrong_status(res, expected_status) {
    if (res.status() !== expected_status) {
      res.text().then((text) => {
        console.error("Details:", text);
      });
    }
  }
}
