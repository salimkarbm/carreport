import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => Report, (report) => report.user)
  // reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Insert user with ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update user with ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove user with ID', this.id);
  }
}
