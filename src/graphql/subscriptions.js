// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
    id
    name
    description
    notes
    date
  }
}
`;
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
    id
    name
    description
    notes
    date
  }
}
`;
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
    id
    name
    description
    notes
    date
  }
}
`;
export const onCreateObject = `subscription OnCreateObject {
  onCreateObject {
    id
    s3Key
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
export const onUpdateObject = `subscription OnUpdateObject {
  onUpdateObject {
    id
    s3Key
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
export const onDeleteObject = `subscription OnDeleteObject {
  onDeleteObject {
    id
    s3Key
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
        s3Key
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
        s3Key
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
        s3Key
        name
        prefix
      }
      nextToken
    }
  }
}
`;
