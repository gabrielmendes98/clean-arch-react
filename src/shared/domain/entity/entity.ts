export abstract class Entity<Props = any> {
  constructor(public readonly props: Props) {}

  toJSON(): Props {
    return this.props;
  }
}
