export const usersApiData = {
  usersTag: 'Users',
  userId: 'unique user id',
  userLoginExample: 'login123',
  userLogin: 'user login',
  userEmailExample: 'example@email.com',
  userEmail: 'user email',
  userPasswordExample: '%paSs123',
  userPassword: 'user password',
  userRole: 'user role: admin or user',
};

export const usersValidationMessages = {
  incorrectEmail: 'Email must be a correct email address',
  incorrectEmailLength: 'Max length of email address is 100 characters',
  incorrectLogin: 'Login must be a string 3 to 50 characters',
  incorrectPassword:
    'Password must contain one lowercase, one uppercase, one digit, and one special character',
  incorrectPasswordLength: 'Password must be 8 to 30 characters long',
};

export const userExceptionMessages = {
  userAlreadyExist: 'Account with this email address already exist',
  userCreateFailed: 'Failed to create user',
};
