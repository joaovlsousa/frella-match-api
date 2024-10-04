import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

import { Body } from './body';
import { SubmissionProps } from './submission';

type WorkStatus = 'OPEN' | 'CLOSED' | 'FINISHED';

export interface WorkProps {
  title: string;
  description: Body;
  deliveryTime: Date;
  amountCharged: number;
  status?: WorkStatus;
  recruterId: string;
  freelancerId: string;
  submissions?: SubmissionProps[];
  createdAt: Date;
}

export class Work {
  private _id: string;
  private props: WorkProps;

  constructor(props: Replace<WorkProps, { createdAt?: Date }>) {
    this._id = generateId();
    this.props = {
      ...props,
      status: props.status ?? 'OPEN',
      submissions: props.submissions ?? [],
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set freelancerId(freelancerId: string) {
    this.props.freelancerId = freelancerId;
  }

  public get freelancerId(): string {
    return this.props.freelancerId;
  }

  public get recruterId(): string {
    return this.props.recruterId;
  }

  public set description(description: Body) {
    this.props.description = description;
  }

  public get description(): Body {
    return this.props.description;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set status(status: WorkStatus) {
    this.props.status = status;
  }

  public get status(): WorkStatus {
    return this.props.status;
  }

  public set deliveryTime(deliveryTime: Date) {
    this.props.deliveryTime = deliveryTime;
  }

  public get deliveryTime(): Date {
    return this.props.deliveryTime;
  }

  public set amountCharged(amountCharged: number) {
    this.props.amountCharged = amountCharged;
  }

  public get amountCharged(): number {
    return this.props.amountCharged;
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
