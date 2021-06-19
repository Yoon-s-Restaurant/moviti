import { createConnection, getManager, getConnection } from "typeorm";
import { Test } from "../models/test.model";

beforeEach(() => {
  return createConnection({
    type: "mysql",
    host: "",
    port: 3306,
    username: "admin",
    password: "",
    database: "moviti",
    synchronize: false,
    entities: ["src/models/*.ts"],
    logging: false,
  });
});

test("유저회원가입", async () => {
  // const entityManager = getManager();
  // const user = await entityManager.findOne(User, 1);
  // if (user) {
  //   user.name = "testname";
  //   await entityManager.save(user);
  // }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Test)
    .values([{ name: "Timber" }])
    .execute();

  expect(Test).toBe("");
});
