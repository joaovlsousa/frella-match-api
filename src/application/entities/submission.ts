import { generateId } from '@helpers/generate-id';
import { Replace } from '@helpers/replace';

import { Body } from './body';

export interface SubmissionProps {
  freelancerId: string;
  workId: string;
  body: Body;
  portfolioLink?: string | null;
  linkedinLink?: string | null;
  deliveryTime: Date;
  amountCharged: number;
  createdAt: Date;
}

export class Submission {
  private _id: string;
  private props: SubmissionProps;

  constructor(props: Replace<SubmissionProps, { createdAt?: Date }>) {
    this._id = generateId();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get freelancerId(): string {
    return this.props.freelancerId;
  }

  public get workId(): string {
    return this.props.workId;
  }

  public set body(body: Body) {
    this.props.body = body;
  }

  public get body(): Body {
    return this.props.body;
  }

  public set portfolioLink(portfolioLink: string | null) {
    this.props.portfolioLink = portfolioLink;
  }

  public get portfolioLink(): string | null | undefined {
    return this.props.portfolioLink;
  }

  public set linkedinLink(linkedinLink: string | null) {
    this.props.linkedinLink = linkedinLink;
  }

  public get linkedinLink(): string | null | undefined {
    return this.props.linkedinLink;
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
