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
    name
    objectType
    createdBy {
      id
      name
    }
  }
}
`;
export const onUpdateObject = `subscription OnUpdateObject {
  onUpdateObject {
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
export const onDeleteObject = `subscription OnDeleteObject {
  onDeleteObject {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
