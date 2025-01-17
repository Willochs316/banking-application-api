import { Document } from 'mongoose';
import { Role } from 'src/roles/role.enum';

export interface User extends Document {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountNumber: string;
  initialBalance: number;
  password?: string;
  address: string;
  city: string;
  state: string;
  postalCode: number;
  isDeleted?: boolean;
  role: Role;
}
