import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { User } from '../auth/entities/user.entity';
import { Technology } from '../technologies/entities/technology.entity';
import { Action } from '../auth/entities/action.enum';
import { Role } from '../auth/entities/role.enum';

type Subjects = InferSubjects<typeof Technology | typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    for (const role of user.roles) {
      switch (role) {
        case Role.Admin:
          can(Action.Manage, 'all');
          break;
        case Role.User:
          can(Action.Read, 'all'); // read-only access to everything
          break;
      }
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
