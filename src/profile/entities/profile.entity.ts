import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';

@Entity()
export class Profile  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length:50})
  first_name: string;

  @Column({ length:50})
  last_name: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
  })
  gender: 'M' | 'F';

  @Column({ type: 'date' })
  date_of_birth: number; // note. all dates are epoch numbers

  @Column({ nullable: true})
  passport_id: number | undefined;

  @Column({ nullable: true})
  national_id: number | undefined;

  @OneToOne(type => Profile, profile => profile.id)
  role_id: number; // note. FK -> roles model

  @Column({ default: true})
  active: boolean;
}
