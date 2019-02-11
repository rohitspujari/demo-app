import { useState, useEffect } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';

export default function useUserFiles(userId, files) {
  const fetchUserObjects = `query GetUser($id: ID!, $nextToken: String) {
    getUser(id: $id) {
      id
      name
      email
      type
      sub
      createdAt
      objects (nextToken: $nextToken, limit: 10, sortDirection: DESC ) {
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
  }`;

  const [S3Files, setS3Files] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [progress, setProgress] = useState(null);

  const getUserObjects = async () => {
    if (hasMore) {
      const { data } = await API.graphql(
        graphqlOperation(fetchUserObjects, {
          id: userId,
          nextToken
        })
      );

      const existingIDs = S3Files.map(s => s.id); // remove ids that arrived through subscription
      const filteredItems = data.getUser.objects.items.filter(
        f => !existingIDs.includes(f.id)
      );

      const updatedItems = [...S3Files, ...filteredItems];
      setS3Files(updatedItems);
      if (data.getUser.objects.nextToken === null) {
        setHasMore(false);
      } else {
        setNextToken(data.getUser.objects.nextToken);
      }
    }
  };

  const removeUserObject = async (id, key) => {
    const updatedFiles = S3Files.filter(f => f.id !== id);
    setS3Files(updatedFiles);
    const res = await Storage.remove(key, { level: 'private' });
    if (res) {
      await API.graphql(
        graphqlOperation(mutations.deleteS3Object, {
          input: {
            id
          }
        })
      );
    }
  };

  useEffect(() => {
    const createSubscription = API.graphql(
      graphqlOperation(subscriptions.onCreateS3Object)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateS3Object: newItem }
        }
      }) => {
        setS3Files(prev => {
          return [newItem, ...prev];
        });
      }
    });

    const deleteSubscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteS3Object)
    ).subscribe({
      next: ({
        value: {
          data: { onDeleteS3Object: deletedItem }
        }
      }) => {
        setS3Files(prev => {
          const updated = prev.filter(f => f.id !== deletedItem.id);
          return updated;
        });
      }
    });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    //console.log('-- get user objects effect --');
    getUserObjects();
  }, [userId]);

  const uploadFiles = async event => {
    const fileArrary = [];
    const fileIndexes = Object.keys(event.target.files);
    fileIndexes.forEach(f => fileArrary.push(event.target.files[f]));
    fileArrary.forEach(async file => {
      const prefix = file.type.split('/')[0];
      const extension = file.name.split('.')[file.name.split('.').length - 1];
      const fileId = uuid();

      //console.log(file);
      const result = await Storage.put(`${prefix}/${fileId}`, file, {
        level: 'private',
        contentType: file.type,
        progressCallback(progress) {
          //console.log(`Uploaded: ${progress.loaded / progress.total}`);
          const percentProgress = Math.floor(
            (progress.loaded / progress.total) * 100
          );
          if (percentProgress < 100) {
            setProgress(`${percentProgress}%`);
          } else {
            setProgress(null);
          }
        }
      });
      if (result) {
        //console.log(result);
        //console.log(user, fileId, file.name, prefix);
        const res = await API.graphql(
          graphqlOperation(mutations.createS3Object, {
            input: {
              id: fileId,
              key: `${prefix}/${fileId}`,
              name: file.name,
              prefix: prefix,
              s3ObjectCreatedById: userId //check graphQL query console to get this ID
            }
          })
        );
        //console.log(res);
      }
    });
  };

  return {
    S3Files,
    hasMore,
    getUserObjects,
    removeUserObject,
    uploadFiles,
    progress
  };
}
