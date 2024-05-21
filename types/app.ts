import type { Database } from "~/types/database";

export type AppEvent = Database["public"]["Tables"]["events"]["Row"] & {
  registration?: Database["public"]["Tables"]["registrations"]["Row"];
};
