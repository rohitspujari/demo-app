// import React, { Component } from 'react';
// import { graphqlOperation } from 'aws-amplify';
// import { Connect } from 'aws-amplify-react';

// import * as mutations from '../../graphql/mutations';
// import * as queries from '../../graphql/queries';
// import * as subscriptions from '../../graphql/subscriptions';

// class AddTodo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       description: ''
//     };
//   }

//   handleChange(name, ev) {
//     this.setState({ [name]: ev.target.value });
//   }

//   async submit() {
//     const { onCreate } = this.props;
//     var input = {
//       name: this.state.name,
//       description: this.state.description
//     };
//     //console.log(input);
//     await onCreate({ input });
//   }

//   render() {
//     return (
//       <div>
//         <input
//           name="name"
//           placeholder="name"
//           onChange={ev => {
//             this.handleChange('name', ev);
//           }}
//         />
//         <input
//           name="description"
//           placeholder="description"
//           onChange={ev => {
//             this.handleChange('description', ev);
//           }}
//         />
//         <button onClick={this.submit.bind(this)}>Add</button>
//       </div>
//     );
//   }
// }

// export default class GraphQLDemo extends Component {
//   render() {
//     const ListView = ({ todos }) => (
//       <div>
//         <h3>All Todos</h3>
//         <ul>
//           {todos.map(todo => (
//             <li key={todo.id}>{todo.name}</li>
//           ))}
//         </ul>
//       </div>
//     );

//     return (
//       <div className="GraphQL App">
//         <Connect
//           className="mutation"
//           mutation={graphqlOperation(mutations.createTask)}
//         >
//           {({ mutation }) => <AddTodo onCreate={mutation} />}
//         </Connect>

//         <Connect
//           className="subscription"
//           query={graphqlOperation(queries.listTasks)}
//           subscription={graphqlOperation(subscriptions.onCreateTask)}
//           onSubscriptionMsg={(prevQuery, newData) => {
//             console.log('prevQuery', prevQuery);
//             console.log('newData', newData);
//             let updatedQuery = Object.assign({}, prevQuery);
//             updatedQuery.listTasks.items = prevQuery.listTasks.items.concat([
//               newData.onCreateTask
//             ]);
//             return updatedQuery;
//           }}
//         >
//           {({ data: { listTasks }, loading, error }) => {
//             if (error) return <h3>Error</h3>;
//             if (loading || !listTasks) return <h3>Loading...</h3>;
//             return <ListView todos={listTasks.items} />;
//           }}
//         </Connect>
//       </div>
//     );
//   }
// }
