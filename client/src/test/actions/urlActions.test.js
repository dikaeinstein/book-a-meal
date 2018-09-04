import { userSignedIn, adminSignedIn } from '../../actions/urlActions';

describe('urlActions', () => {
  it('should create an action to change navigation links on signin', () => {
    const urls = [
      {
        id: 1,
        name: 'Sign In',
        link: 'signin',
      },
      {
        id: 2,
        name: 'Sign Up',
        link: 'signup',
      },
    ];
    const expectedUserAction = { type: 'USER_SIGN_IN_SUCCESS', urls };
    const expectedAdminAction = { type: 'ADMIN_SIGN_IN_SUCCESS', urls };
    expect(userSignedIn(urls)).toEqual(expectedUserAction);
    expect(adminSignedIn(urls)).toEqual(expectedAdminAction);
  });
});
