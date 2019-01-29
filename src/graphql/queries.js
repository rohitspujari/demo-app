// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
    id
    name
    description
    notes
    date
  }
}
`;
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      notes
      date
    }
    nextToken
  }
}
`;
export const getObject = `query GetObject($id: ID!) {
  getObject(id: $id) {
    id
    name
    objectType
    createdBy {
      id
      name
    }
  }
}
`;
export const listObjects = `query ListObjects(
  $filter: ModelObjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      objectType
      createdBy {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      objects {
        items {
          id
          name
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const searchObjects = `query SearchObjects(
  $filter: SearchableObjectFilterInput
  $sort: SearchableObjectSortInput
  $limit: Int
  $nextToken: Int
) {
  searchObjects(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      objectType
      createdBy {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const searchUsers = `query SearchUsers(
  $filter: SearchableUserFilterInput
  $sort: SearchableUserSortInput
  $limit: Int
  $nextToken: Int
) {
  searchUsers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      objects {
        items {
          id
          name
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
