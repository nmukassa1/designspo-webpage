// types/api.ts

export type UpdateDescriptionSuccess = {
  message: string;
  status: "OK";
};

export type UpdateDescriptionError = {
  error: string;
  err?: unknown;
};

export type UpdateDescriptionResponse =
  | UpdateDescriptionSuccess
  | UpdateDescriptionError;
