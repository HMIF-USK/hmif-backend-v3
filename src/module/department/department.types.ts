export interface IDepartment {
  id: string;
  name: string;
  description: string;
}

export type PickUpdateDepartment = Pick<
  IDepartment,
  "name" | "description"
>;