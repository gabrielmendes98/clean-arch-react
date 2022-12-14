import { RouterService } from 'shared/application/router.port';

export const routerServiceMock: RouterService = {
  navigate: jest.fn(),
  getUrlParams: jest.fn().mockReturnValue({}),
};
