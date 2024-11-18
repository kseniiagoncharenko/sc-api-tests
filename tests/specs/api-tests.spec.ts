import { expect, test } from '@playwright/test';
import { APIHelper } from '../helpers/api-helper';
import { getApiUrl, getSingleItemApiUrl } from '../helpers/urls';

let usersUrl: string,
  registerUrl: string,
  loginUrl: string,
  logoutUrl: string,
  apiHelper: APIHelper;

test.beforeAll(async ({ }) => {
  usersUrl = getApiUrl('users');
  registerUrl = getApiUrl('register');
  loginUrl = getApiUrl('login');
  logoutUrl = getApiUrl('logout');
});

test.beforeEach(async () => {
  apiHelper = new APIHelper();
});

test('Verify that registration of undefined users is not possible', async ({ request }) => {
  const userData = {
    username: "Torin",
    email: "torin.oakenshield@test.com",
    password: "friend"
  }

  let errorMessage = 'Note: Only defined users succeed registration';

  await apiHelper.sendFailedPostRequest(request, registerUrl, userData, errorMessage);
});

test('Get a defined user, register, login and logout', async ({ request }) => {
  let userData: any;

  const responseGetUsers = await apiHelper.sendGetRequest(request, usersUrl);
  const responseBodyGetUsers = await responseGetUsers.json();

  expect(responseBodyGetUsers.data.length, 'Response data is empty.').toBeGreaterThan(0);
  const userEmail = await responseBodyGetUsers.data[0].email;

  userData = {
    email: userEmail,
    password: 'testpass'
  }

  const responseRegister = await apiHelper.sendPostRequest(request, registerUrl, userData);
  const userToken = await apiHelper.getValueFromResponse(responseRegister, 'token');

  const responseLogin = await apiHelper.sendPostRequest(request, loginUrl, userData);
  const userLoginToken = await apiHelper.getValueFromResponse(responseLogin, 'token');

  expect(userLoginToken, 'User is not logged in.').toBe(userToken);

  await apiHelper.sendPostRequest(request, logoutUrl, userData);
});

test('Patch and delete existing user', async ({ request }) => {
  let userData: any, singleUserUrl: string;

  const responseGetUsers = await apiHelper.sendGetRequest(request, usersUrl);
  const responseBodyGetUsers = await responseGetUsers.json();
  const dataGetUsersLength = await responseBodyGetUsers.data.length;

  expect(dataGetUsersLength, 'Response data is empty.').toBeGreaterThan(0);
  const randomIndex = Math.floor(Math.random() * dataGetUsersLength);
  const userId = await responseBodyGetUsers.data[randomIndex].id;

  singleUserUrl = getSingleItemApiUrl(usersUrl, userId);

  const responseGetUser = await apiHelper.sendGetRequest(request, singleUserUrl);
  const responseBodyGetUser = await responseGetUser.json();
  const userFirstName = await responseBodyGetUser.data.first_name;
  userData = {
    first_name: `${userFirstName}Edited`
  }
  const responsePatch = await apiHelper.sendPatchRequest(request, singleUserUrl, userData);
  const editedFirstName = await apiHelper.getValueFromResponse(responsePatch, 'first_name');
  expect(editedFirstName).toContain(userData.first_name);

  await apiHelper.sendDeleteRequest(request, singleUserUrl);
});