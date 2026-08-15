export interface IDepartmentPhoto {
  id?: string;
  departement_id?: string;
  url: string;
  namaFoto: string;
}

export interface IDepartment {
  id: string;
  name: string;
  slug?: string | null;
  description: string;
  fotoDepartements?: IDepartmentPhoto[];
}

export type PickUpdateDepartment = Partial<
  Pick<IDepartment, "name" | "slug" | "description">
>;

export interface IAddPhotoPayload {
  url: string;
  namaFoto: string;
}