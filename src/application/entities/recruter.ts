import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

export interface RecruterProps {
  name: string;
  email: string;
  imageUrl?: string | null;
  createdAt: Date;
}

export class Recruter {
  private _id: string;
  private props: RecruterProps;

  constructor(
    props: Replace<RecruterProps, { createdAt?: Date }>,
    id?: string,
  ) {
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
