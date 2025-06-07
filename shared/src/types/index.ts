export interface ApiResponse<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  success: false;
  errors?: ValidationError[];
  timestamp: string;
}
