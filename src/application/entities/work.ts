import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

import { Body } from './body';
import { EndsAt } from './ends-at';

export type WorkStatus = 'OPEN' | 'CLOSED' | 'FINISHED';

export interface WorkProps {
  title: string;
  description: Body;
  endsAt: EndsAt;
  amountCharged: number;
  status?: WorkStatus;
  recruiterId: string;
  freelancerId?: string | null;
  createdAt: Date;
}

export class Work {
  private _id: string;
  private props: WorkProps;

  constructor(props: Replace<WorkProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? generateId();
    this.props = {
      ...props,
      status: props.status ?? 'OPEN',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set freelancerId(freelancerId: string | null) {
    this.props.freelancerId = freelancerId;
  }

  public get freelancerId(): string | null | undefined {
    return this.props.freelancerId;
  }

  public get recruiterId(): string {
    return this.props.recruiterId;
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

  public set endsAt(endsAt: EndsAt) {
    this.props.endsAt = endsAt;
  }

  public get endsAt(): EndsAt {
    return this.props.endsAt;
  }

  public set amountCharged(amountCharged: number) {
    this.props.amountCharged = amountCharged;
  }

  public get amountCharged(): number {
    return this.props.amountCharged;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
