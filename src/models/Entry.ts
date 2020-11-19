import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  walletId: string | null;

  @ManyToOne(() => Wallet, wallet => wallet.entries)
  wallet: Promise<Wallet>;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Entry;
