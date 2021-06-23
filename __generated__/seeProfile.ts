/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile {
  __typename: "User";
  username: string;
  email: string;
  name: string;
  location: string;
  avatarURL: string | null;
  githubUsername: string | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
}
