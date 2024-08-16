import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
  },
  toObject: {
    versionKey: false,
  },
})
export class User {
  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists!'],
  })
  email: string;

  @Prop({
    required: [true, 'Email is required'],
  })
  password: string;

  @Prop({
    default: '',
  })
  firstName: string;

  @Prop({
    default: '',
  })
  lastName: string;

  @Prop({
    default: '',
  })
  profilePicture: string;

  @Prop({
    default: '',
  })
  color: string;
  @Prop({
    default: false,
  })
  profileSetup: boolean;

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

UserSchema.loadClass(User);
