import {
  type PgInteger,
  type PgTableWithColumns,
  type PgText,
  type PgTimestamp,
  type PgUUID,
} from "drizzle-orm/pg-core";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { type AdapterAccount } from "next-auth/adapters";

type UsersTable = PgTableWithColumns<{
  name: "users";
  schema: undefined;
  columns: {
    id: PgUUID<{
      tableName: "users";
      name: "id";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: true;
    }>;
    name: PgText<{
      tableName: "users";
      name: "name";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    email: PgText<{
      tableName: "users";
      enumValues: [string, ...string[]];
      name: "email";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    emailVerified: PgTimestamp<{
      tableName: "users";
      name: "emailVerified";
      data: Date;
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    image: PgText<{
      tableName: "users";
      name: "image";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
  };
}>;

type AccountsTable = PgTableWithColumns<{
  name: "accounts";
  schema: undefined;
  columns: {
    userId: PgText<{
      tableName: "accounts";
      enumValues: [string, ...string[]];
      name: "userId";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    type: PgText<{
      tableName: "accounts";
      enumValues: [string, ...string[]];
      data: AdapterAccount["type"];
      name: "type";
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    provider: PgText<{
      tableName: "accounts";
      enumValues: [string, ...string[]];
      name: "provider";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    providerAccountId: PgText<{
      tableName: "accounts";
      enumValues: [string, ...string[]];
      name: "providerAccountId";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    refresh_token: PgText<{
      tableName: "accounts";
      name: "refresh_token";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    access_token: PgText<{
      tableName: "accounts";
      name: "access_token";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    expires_at: PgInteger<{
      tableName: "accounts";
      name: "expires_at";
      data: number;
      driverParam: string | number;
      hasDefault: false;
      notNull: false;
    }>;
    token_type: PgText<{
      tableName: "accounts";
      name: "token_type";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    scope: PgText<{
      tableName: "accounts";
      name: "scope";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    id_token: PgText<{
      tableName: "accounts";
      name: "id_token";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
    session_state: PgText<{
      tableName: "accounts";
      name: "session_state";
      data: string;
      enumValues: [string, ...string[]];
      driverParam: string;
      notNull: false;
      hasDefault: false;
    }>;
  };
}>;

type SessionsTable = PgTableWithColumns<{
  name: "sessions";
  schema: undefined;
  columns: {
    sessionToken: PgText<{
      tableName: "sessions";
      enumValues: [string, ...string[]];
      name: "sessionToken";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    userId: PgText<{
      tableName: "sessions";
      enumValues: [string, ...string[]];
      name: "userId";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    expires: PgTimestamp<{
      tableName: "sessions";
      name: "expires";
      data: Date;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
  };
}>;

type VerificationTokenTable = PgTableWithColumns<{
  name: "verificationToken";
  schema: undefined;
  columns: {
    identifier: PgText<{
      tableName: "verificationToken";
      enumValues: [string, ...string[]];
      name: "identifier";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    token: PgText<{
      tableName: "verificationToken";
      enumValues: [string, ...string[]];
      name: "token";
      data: string;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
    expires: PgTimestamp<{
      tableName: "verificationToken";
      name: "expires";
      data: Date;
      driverParam: string;
      hasDefault: false;
      notNull: true;
    }>;
  };
}>;

export type AuthSchema = {
  users: UsersTable;
  accounts: AccountsTable;
  sessions: SessionsTable;
  verificationTokens: VerificationTokenTable;
};

export type DbClient<T extends AuthSchema = AuthSchema> = PostgresJsDatabase<T>;
