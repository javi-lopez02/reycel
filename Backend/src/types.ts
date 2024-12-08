export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface File {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

declare global {
  namespace Express {
    interface Request {
      userId: string
      userName: string
    }
  }
}

export interface SortItem {
  field: "createdAt" | "price" | "ratingAverage"; // Los campos permitidos
  order: "asc" | "desc"; // Los valores permitidos
}
