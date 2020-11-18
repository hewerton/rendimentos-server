import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './User';
import Wallet from './Wallet';

@Entity('entries')
class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticker: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  taxes: number;

  @Column()
  date: Date;

  @ManyToOne(() => Wallet, wallet => wallet.entries)
  wallet: Wallet;

  @ManyToOne(() => User)
  user: User;

  createdAt: Date;
  updatedAt: Date;
}

export default Entry;
