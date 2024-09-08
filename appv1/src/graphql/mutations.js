/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      userConversations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      userConversations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      userConversations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
      id
      name
      userConversations {
        nextToken
        __typename
      }
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
      id
      name
      userConversations {
        nextToken
        __typename
      }
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
      id
      name
      userConversations {
        nextToken
        __typename
      }
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserConversations = /* GraphQL */ `
  mutation CreateUserConversations(
    $input: CreateUserConversationsInput!
    $condition: ModelUserConversationsConditionInput
  ) {
    createUserConversations(input: $input, condition: $condition) {
      id
      userId
      conversationId
      user {
        id
        username
        email
        firstName
        lastName
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserConversations = /* GraphQL */ `
  mutation UpdateUserConversations(
    $input: UpdateUserConversationsInput!
    $condition: ModelUserConversationsConditionInput
  ) {
    updateUserConversations(input: $input, condition: $condition) {
      id
      userId
      conversationId
      user {
        id
        username
        email
        firstName
        lastName
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserConversations = /* GraphQL */ `
  mutation DeleteUserConversations(
    $input: DeleteUserConversationsInput!
    $condition: ModelUserConversationsConditionInput
  ) {
    deleteUserConversations(input: $input, condition: $condition) {
      id
      userId
      conversationId
      user {
        id
        username
        email
        firstName
        lastName
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      createdAt
      owner
      conversationID
      isRead
      updatedAt
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      createdAt
      owner
      conversationID
      isRead
      updatedAt
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      createdAt
      owner
      conversationID
      isRead
      updatedAt
      __typename
    }
  }
`;
