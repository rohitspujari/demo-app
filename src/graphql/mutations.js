// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    name
    description
    notes
    date
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    name
    description
    notes
    date
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    id
    name
    description
    notes
    date
  }
}
`;
export const createObject = `mutation CreateObject($input: CreateObjectInput!) {
  createObject(input: $input) {
    id
    name
    objectType
    createdBy {
      id
      name
      email
      type
    }
  }
}
`;
export const updateObject = `mutation UpdateObject($input: UpdateObjectInput!) {
  updateObject(input: $input) {
    id
    name
    objectType
    createdBy {
      id
      name
      email
      type
    }
  }
}
`;
export const deleteObject = `mutation DeleteObject($input: DeleteObjectInput!) {
  deleteObject(input: $input) {
    id
    name
    objectType
    createdBy {
      id
      name
      email
      type
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
    objects {
      items {
        id
        name
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
    objects {
      items {
        id
        name
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
    objects {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
