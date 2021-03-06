import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/auth.model";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  createUser(name: string, email: string, type: string, password?: string) {
    return this.createQueryBuilder("user")
      .insert()
      .into(User)
      .values({
        name,
        email,
        password,
        type,
      })
      .execute();
  }

  findByEmail(email: string) {
    return this.createQueryBuilder("findByEmail")
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    console.log("update", email, refreshToken);
    return this.createQueryBuilder("updateRefreshToken")
      .update(User)
      .set({
        refreshToken: refreshToken,
      })
      .where("email = :email", { email: email })
      .execute();
  }
}
