import { UniqueEntityID } from './UniqueEntityId';

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }

  get id() {
    return this._id;
  }
}
