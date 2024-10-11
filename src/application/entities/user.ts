import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

export type UserRole = 'RECRUITER' | 'FREELANCER';

export interface UserProps {
  name: string;
  email: string;
  imageUrl?: string | null;
  password?: string;
  role: UserRole;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? generateId();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set imageUrl(imageUrl: string | null) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string | null | undefined {
    return this.props.imageUrl;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string | undefined {
    return this.props.password;
  }

  public get role(): UserRole {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
