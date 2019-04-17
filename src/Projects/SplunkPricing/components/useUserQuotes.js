import { useState, useEffect } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';

export default function useUserFiles(userId, files) {
  const fetchUserQuotes = `query GetUser($id: ID!, $nextToken: String) {
    getUser(id: $id) {
      id
      name
      email
      type
      sub
      createdAt
      quotes (nextToken: $nextToken, limit: 10, sortDirection: DESC ) {
        items {
          id
          description
          params
          createdAt
        }
        nextToken
      }
    }
  }`;

  const [quotes, setQuotes] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const getUserQuotes = async () => {
    if (hasMore) {
      const { data } = await API.graphql(
        graphqlOperation(fetchUserQuotes, {
          id: userId,
          nextToken
        })
      );

      //   const existingIDs = quotes.map(s => s.id); // remove ids that arrived through subscription
      //   const filteredItems = data.getUser.objects.items.filter(
      //     f => !existingIDs.includes(f.id)
      //   );
      setQuotes([...quotes, ...data.getUser.quotes.items]);
      if (data.getUser.quotes.nextToken === null) {
        setHasMore(false);
      } else {
        setNextToken(data.getUser.quotes.nextToken);
      }
    }
  };

  const removeUserObject = async (id, key) => {
    const updatedQuotes = quotes.filter(f => f.id !== id);
    //setQuotes(updatedQuotes);
    //const res = await Storage.remove(key, { level: 'private' });
    //if (res) {
    await API.graphql(
      graphqlOperation(mutations.deleteQuote, {
        input: {
          id
        }
      })
    );
    // }
  };

  useEffect(() => {
    const createSubscription = API.graphql(
      graphqlOperation(subscriptions.onCreateQuote)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateQuote: newItem }
        }
      }) => {
        setQuotes(prev => {
          return [newItem, ...prev];
        });
      }
    });

    const deleteSubscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteQuote)
    ).subscribe({
      next: ({
        value: {
          data: { onDeleteQuote: deletedItem }
        }
      }) => {
        setQuotes(prev => {
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
    getUserQuotes();
  }, [userId]);

  return {
    quotes,
    hasMore,
    getUserQuotes,
    removeUserObject
  };
}
