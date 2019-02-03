// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateS3Object = `subscription OnCreateS3Object {
  onCreateS3Object {
    id
    name
    prefix
    createdBy {
      id
      name
      email
      type
      sub
    }
  }
}
`;
export const onUpdateS3Object = `subscription OnUpdateS3Object {
  onUpdateS3Object {
    id
    name
    prefix
    createdBy {
      id
      name
      email
      type
      sub
    }
  }
}
`;
export const onDeleteS3Object = `subscription OnDeleteS3Object {
  onDeleteS3Object {
    id
    name
    prefix
    createdBy {
      id
      name
      email
      type
      sub
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
    objects {
      items {
        id
        name
        prefix
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
    objects {
      items {
        id
        name
        prefix
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
    objects {
      items {
        id
        name
        prefix
      }
      nextToken
    }
  }
}
`;
