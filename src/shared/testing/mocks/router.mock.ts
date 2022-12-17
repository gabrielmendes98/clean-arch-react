import { RouterService } from 'shared/application/router.port';

export const routerServiceMock: RouterService = {
  navigate: jest.fn(),
  getUrlParams: () => ({
    id: '/ce734f82-2fac-4845-b394-66bd67e6e271',
  }),
};
