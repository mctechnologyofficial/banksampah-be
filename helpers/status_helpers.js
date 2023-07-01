'use strict';

const status = {};

status.successMessage = ress => (
	{
		code: '01',
		status: true,
		message: 'Success',
		data: ress
	}
);

status.emptyMessage = ress => (
	{
		code: '02',
		status: true,
		message: 'Data tidak ditemukan',
		data: ress
	}
);

status.errorMessage = ress => (
	{
		code: '02',
		status: false,
		message: 'Error',
		data:ress
	}
);

status.forbiddenMessage = (M) => (
	{
		code: '02',
		status: false,
		message: M
	}
);

status.emptyFile = M => (
	{
		code: '02',
		status: false,
		message: M
	}
);

status.statusCode = {
	success: 200,
	error: 500,
	notfound: 404,
	unauthorized: 401,
	conflict: 409,
	created: 201,
	bad: 400,
	nocontent: 204,
	forbidden: 403,
};

status.trip_statuses = {
	active: 1,
	notactive: 0
};

status.invalidToken = ress => (
  {
      error: 'invalid_token',
      error_description: 'invalid token provided',
      data:ress
  }
);

status.expiredToken = ress => (
  {
      error: 'expired_token',
      data:ress
  }
);

status.invalidRequest = ress => (
  {
      error: 'invalid_request',
      error_description: 'request is invalid',
      data:ress
  }
);

status.invalidGrant = ress => (
  {
      error: 'invalid_grant',
      error_description: 'grant request is invalid',
      data:ress
  }
);

status.errorSso = error => (
  {
      error: error.error,
      error_description: error.error_description
  }
);

module.exports = status;
