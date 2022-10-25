const basePath = 'http://eva.huv.gov.co:5000';
// const basePath = 'http://localhost:5000';

export const urlPaths = {
  BASE: basePath,
  BASE_SERVICES: `${basePath}/services`,
  BASE_LOGIN: `${basePath}/auth/signup`,
  BASE_MEDICAL_DEVICES: `${basePath}/devices`,
  TOKEN_VALIDATION: `${basePath}/auth/validationtoken`,
};
