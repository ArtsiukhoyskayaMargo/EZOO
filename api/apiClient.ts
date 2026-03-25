import { APIRequestContext, request } from "@playwright/test";

export class ApiClient {
  private apiContext: APIRequestContext | null = null;
  private baseApiURL: string;

  constructor(baseApiURL: string) {
      this.baseApiURL = baseApiURL;
  }

      async create() {
            this.apiContext = await request.newContext({
                baseURL: this.baseApiURL,
                extraHTTPHeaders: {
                  'content-type': 'application/json',
                },
            });
      }
      
      public async dispose(): Promise<void> {
        if (this.apiContext) {
          await this.apiContext.dispose();
          this.apiContext = null;
          console.log('API context disposed successfully.');
        }
      }
      
      public async get<T>(path:string, params?: { [key: string]: string | number | boolean }): Promise<T> {
            console.log(`GET ${this.baseApiURL}${path}`, params ? `with params: ${JSON.stringify(params)}` : '');
            const response = await this.apiContext!.get(path, { params });
            await this.checkResponse(response, `GET ${path}`);
            return response.json();
      }

      public async post<T>(path: string, data: any): Promise<T> {
            console.log(`POST ${this.baseApiURL}${path}, data: ${JSON.stringify(data)}`);
            const response = await this.apiContext!.post(path, { data });
            await this.checkResponse(response, `POST ${path}`);
            return response.json();
      }

      public async put<T>(path: string, data: any): Promise<T> {
            console.log(`PUT ${this.baseApiURL}${path}, data: ${JSON.stringify(data)}`);
            const response = await this.apiContext!.put(path, { data });
            await this.checkResponse(response, `PUT ${path}`);
            return response.json();
      }

      public async delete<T>(path: string): Promise<T> {
            console.log(`DELETE ${this.baseApiURL}${path}`);
            const response = await this.apiContext!.delete(path);
            await this.checkResponse(response, `DELETE ${path}`);
            return response.json();
      }
       
      private async checkResponse(response: any, requestInfo: string): Promise<void> {
            if (!response.ok()) {
                  const errorText = await response.text();
                  throw new Error(`API Request Failed for ${requestInfo}: ${response.status()} - ${response.statusText()} - ${errorText}`);
            }
      }
}