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
      objects {
        nextToken
      }
      quotes {
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
      objects {
        nextToken
      }
      quotes {
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
      objects {
        nextToken
      }
      quotes {
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
    quotes {
      items {
        id
        description
        params
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
    quotes {
      items {
        id
        description
        params
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
    quotes {
      items {
        id
        description
        params
        createdAt
      }
      nextToken
    }
  }
}
`;
export const createQuote = `mutation CreateQuote($input: CreateQuoteInput!) {
  createQuote(input: $input) {
    id
    description
    params
    createdAt
    user {
      id
      name
      email
      type
      sub
      createdAt
      objects {
        nextToken
      }
      quotes {
        nextToken
      }
    }
  }
}
`;
export const updateQuote = `mutation UpdateQuote($input: UpdateQuoteInput!) {
  updateQuote(input: $input) {
    id
    description
    params
    createdAt
    user {
      id
      name
      email
      type
      sub
      createdAt
      objects {
        nextToken
      }
      quotes {
        nextToken
      }
    }
  }
}
`;
export const deleteQuote = `mutation DeleteQuote($input: DeleteQuoteInput!) {
  deleteQuote(input: $input) {
    id
    description
    params
    createdAt
    user {
      id
      name
      email
      type
      sub
      createdAt
      objects {
        nextToken
      }
      quotes {
        nextToken
      }
    }
  }
}
`;
export const createAnalysis = `mutation CreateAnalysis($input: CreateAnalysisInput!) {
  createAnalysis(input: $input) {
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
      quotes {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const updateAnalysis = `mutation UpdateAnalysis($input: UpdateAnalysisInput!) {
  updateAnalysis(input: $input) {
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
      quotes {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const deleteAnalysis = `mutation DeleteAnalysis($input: DeleteAnalysisInput!) {
  deleteAnalysis(input: $input) {
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
      quotes {
        nextToken
      }
    }
    createdAt
  }
}
`;
