// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateS3Object = `subscription OnCreateS3Object {
  onCreateS3Object {
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
export const onUpdateS3Object = `subscription OnUpdateS3Object {
  onUpdateS3Object {
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
export const onDeleteS3Object = `subscription OnDeleteS3Object {
  onDeleteS3Object {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateAnalysis = `subscription OnCreateAnalysis {
  onCreateAnalysis {
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
}
`;
export const onUpdateAnalysis = `subscription OnUpdateAnalysis {
  onUpdateAnalysis {
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
}
`;
export const onDeleteAnalysis = `subscription OnDeleteAnalysis {
  onDeleteAnalysis {
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
}
`;
