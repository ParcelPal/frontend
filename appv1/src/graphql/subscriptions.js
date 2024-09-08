/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onCreateConversation(filter: $filter) {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onUpdateConversation(filter: $filter) {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onDeleteConversation(filter: $filter) {
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
export const onCreateUserConversations = /* GraphQL */ `
  subscription OnCreateUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onCreateUserConversations(filter: $filter) {
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
export const onUpdateUserConversations = /* GraphQL */ `
  subscription OnUpdateUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onUpdateUserConversations(filter: $filter) {
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
export const onDeleteUserConversations = /* GraphQL */ `
  subscription OnDeleteUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onDeleteUserConversations(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
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
