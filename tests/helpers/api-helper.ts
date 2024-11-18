import { expect, APIRequestContext } from '@playwright/test';

export class APIHelper {
    public async sendGetRequest(request: APIRequestContext, url: string) {
        const response = await request.get(url);
        expect(response.ok()).toBeTruthy();
        return response;
    }

    public async sendPostRequest(request: APIRequestContext, url: string, sendData: any) {
        const response = await request.post(url, { data: sendData });
        expect(response.ok()).toBeTruthy();
        return response;
    }

    public async sendFailedPostRequest(request: APIRequestContext, url: string, sendData: any, errorMessage: string) {
        const response = await request.post(url, { data: sendData });
        expect(await response.text()).toContain(errorMessage);
    }

    public async sendPatchRequest(request: APIRequestContext, url: string, sendData: any) {
        const response = await request.patch(url, { data: sendData });
        expect(response.ok()).toBeTruthy();
        return response;
    }

    public async sendDeleteRequest(request: APIRequestContext, url: string) {
        const response = await request.delete(url);
        expect(response.status()).toBe(204);
    }

    public async getValueFromResponse(response: any, key: string) {
        const responseBody = await response.json();
        expect(responseBody, 'Response is null.').not.toBeNull();

        if (key in responseBody) {
            return responseBody[key];
        } else {
            throw new Error(`Key ${key} was not found in response body.`);
        }
    }
}