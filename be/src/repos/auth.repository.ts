import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/auth.model";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  createUser(name: string, email: string, password: string) {
    return this.createQueryBuilder("user")
      .insert()
      .into(User)
      .values({
        name,
        email,
        password,
      })
      .execute();
  }
}
