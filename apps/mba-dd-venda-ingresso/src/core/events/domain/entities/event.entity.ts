/* eslint-disable prettier/prettier */
import { AggregateRoot } from 'apps/mba-dd-venda-ingresso/src/core/common/domain/aggregate.root';
import {
  AnyCollection,
  ICollection,
  MyCollectionFactory,
} from "apps/mba-dd-venda-ingresso/src/core/common/domain/my-collection";
import Uuid from 'apps/mba-dd-venda-ingresso/src/core/common/domain/value-objects/uuid.vo';
import { EventSection, EventSectionId } from './event-section.entity';
import { EventSpotId } from './event-spot.entity';
import { PartnerId } from './partner.entity';

export class EventId extends Uuid {}

export type CreateEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
  partner_id: PartnerId;
};

export type AddSectionCommand = {
  name: string;
  description?: string | null;
  total_spots: number;
  price: number;
};

export type EventConstructorProps = {
  id?: EventId | string;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId | string;
  _sections?: ICollection<EventSection>;
};

export class Event extends AggregateRoot {
  id: EventId;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId;
  private _sections: ICollection<EventSection>;

  constructor(props: EventConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new EventId(props.id)
        : props.id ?? new EventId();

    this.name = props.name;
    this.description = props.description;
    this.date = props.date;
    this.is_published = props.is_published;
    this.total_spots = props.total_spots;
    this.total_spots_reserved = props.total_spots_reserved;
    this.partner_id =
      props.partner_id instanceof PartnerId
        ? props.partner_id
        : new PartnerId(props.partner_id);
    this._sections = MyCollectionFactory.create<EventSection>(this);
  }

  static create(command: CreateEventCommand) {
    return new Event({
      ...command,
      description: command.description ?? null,
      is_published: false,
      total_spots: 0,
      total_spots_reserved: 0,
    });
  }

  addSection(command: AddSectionCommand) {
    const section = EventSection.create(command);
    this._sections.add(section);
    this.total_spots += section.total_spots;
  }

  changeSectionInformation(command: {
    section_id: EventSectionId;
    name?: string;
    description?: string | null;
  }) {
    const section = this.sections.find((section) =>
      section.id.equals(command.section_id),
    );

    if (!section) {
      throw new Error('Section not found');
    }
    'name' in command && section.changeName(command.name);
    'description' in command && section.changeDescription(command.description);
  }

  markSpotAsReserved(command: {
    section_id: EventSectionId,
    spot_id: EventSpotId;
  }){
    const section = this.sections.find((section) => section.id.equals(command.section_id));

    if(!section){
      throw new Error('Section not found');
    }

    section.markSpotAsReserved(command.spot_id);
  }

  changeLocation(command: {
    section_id: EventSectionId;
    spot_id: EventSpotId;
    location: string;
  }) {
    const section = this.sections.find((section) =>
      section.id.equals(command.section_id),
    );

    if (!section) {
      throw new Error('Section not found');
    }
    section.changeLocation(command);
  }

  allowReserveSpot(data: { section_id: EventSectionId; spot_id: EventSpotId }) {
    if (!this.is_published) {
      return false;
    }

    const section = this.sections.find((section) =>
      section.id.equals(data.section_id),
    );

    if (!section) {
      throw new Error('Section not found');
    }

    return section.allowReserveSpot(data.spot_id);
  }

  markSpotAsReserver(command: {
    section_id: EventSectionId;
    spot_id: EventSpotId;
  }){
    const section = this.sections.find((s) => s.id.equals(command.section_id));

    if(!section){
      throw new Error('Section not found');
    }
    section.markSpotAsReserved(command.section_id);
  }

  changeName(name: string) {
    this.name = name;
  }

  changeDescription(description: string | null) {
    this.description = description;
  }

  changeDate(date: Date) {
    this.date = date;
  }

  publishAll() {
    this.publish();
    this._sections.forEach((section) => section.publishAll());
  }

  unPublishAll() {
    this.unpublish();
    this._sections.forEach((section) => section.unPublishAll());
  }

  publish() {
    this.is_published = this.is_published;
  }

  unpublish() {
    this.is_published = this.is_published;
  }

  get sections(): ICollection<EventSection> {
    return this._sections as ICollection<EventSection>;
  }

  set sections(sections: AnyCollection<EventSection>) {
    this._sections = MyCollectionFactory.createFrom<EventSection>(sections);
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      date: this.date,
      is_published: this.is_published,
      total_spots: this.total_spots,
      total_spots_reserved: this.total_spots_reserved,
      partner_id: this.partner_id,
      sections: [...this._sections].map((section) => section.toJSON()),
    };
  }
}
