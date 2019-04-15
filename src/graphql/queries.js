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
      objects {
        nextToken
      }
    }
    analysis {
      items {
        id
        category
        type
        params
        result
        createdAt
      }
      nextToken
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
      analysis {
        nextToken
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
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAnalysis = `query GetAnalysis($id: ID!) {
  getAnalysis(id: $id) {
    id
    object {
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
      analysis {
        nextToken
      }
    }
    category
    type
    params
    result
    createdBy {
      id
      name
      email
      type
      sub
      createdAt
      objects {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const listAnalysiss = `query ListAnalysiss(
  $filter: ModelAnalysisFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnalysiss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      object {
        id
        key
        name
        prefix
        createdAt
      }
      category
      type
      params
      result
      createdBy {
        id
        name
        email
        type
        sub
        createdAt
      }
      createdAt
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
      analysis {
        nextToken
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
        nextToken
      }
    }
    nextToken
  }
}
`;
export const searchAnalysiss = `query SearchAnalysiss(
  $filter: SearchableAnalysisFilterInput
  $sort: SearchableAnalysisSortInput
  $limit: Int
  $nextToken: Int
) {
  searchAnalysiss(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      object {
        id
        key
        name
        prefix
        createdAt
      }
      category
      type
      params
      result
      createdBy {
        id
        name
        email
        type
        sub
        createdAt
      }
      createdAt
    }
    nextToken
  }
}
`;
