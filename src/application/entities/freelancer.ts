import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

import { SubmissionProps } from './submission';
import { WorkProps } from './work';

export interface FreelancerProps {
  name: string;
  email: string;
  imageUrl?: string | null;
  works?: WorkProps[];
  submissions?: SubmissionProps[];
  createdAt: Date;
}

export class Freelancer {
  private _id: string;
  private props: FreelancerProps;

  constructor(props: Replace<FreelancerProps, { createdAt?: Date }>) {
    this._id = generateId();
    this.props = {
      ...props,
      works: props.works ?? [],
      submissions: props.submissions ?? [],
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

  public set works(works: WorkProps[]) {
    this.props.works = works;
  }

  public get works(): WorkProps[] {
    return this.props.works;
  }

  public set submissions(submissions: SubmissionProps[]) {
    this.props.submissions = submissions;
  }

  public get submissions(): SubmissionProps[] {
    return this.props.submissions;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
