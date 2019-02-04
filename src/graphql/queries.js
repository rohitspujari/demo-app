// eslint-disable
// this is an auto generated file. This will be overwritten

export const getS3Object = `query GetS3Object($id: ID!) {
  getS3Object(id: $id) {
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
export const listS3Objects = `query ListS3Objects(
  $filter: ModelS3ObjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listS3Objects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const searchS3Objects = `query SearchS3Objects(
  $filter: SearchableS3ObjectFilterInput
  $sort: SearchableS3ObjectSortInput
  $limit: Int
  $nextToken: Int
) {
  searchS3Objects(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
