// eslint-disable
// this is an auto generated file. This will be overwritten

export const createS3Object = `mutation CreateS3Object($input: CreateS3ObjectInput!) {
  createS3Object(input: $input) {
    id
    key
    name
    prefix
    createdAt
    createdBy {
      id
      name
      email
      type
      sub
      createdAt
    }
  }
}
`;
export const updateS3Object = `mutation UpdateS3Object($input: UpdateS3ObjectInput!) {
  updateS3Object(input: $input) {
    id
    key
    name
    prefix
    createdAt
    createdBy {
      id
      name
      email
      type
      sub
      createdAt
    }
  }
}
`;
export const deleteS3Object = `mutation DeleteS3Object($input: DeleteS3ObjectInput!) {
  deleteS3Object(input: $input) {
    id
    key
    name
    prefix
    createdAt
    createdBy {
      id
      name
      email
      type
      sub
      createdAt
    }
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    type
    sub
    createdAt
    objects {
      items {
        id
        key
        name
        prefix
        createdAt
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    email
    type
    sub
    createdAt
    objects {
      items {
        id
        key
        name
        prefix
        createdAt
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    email
    type
    sub
    createdAt
    objects {
      items {
        id
        key
        name
        prefix
        createdAt
      }
      nextToken
    }
  }
}
`;
