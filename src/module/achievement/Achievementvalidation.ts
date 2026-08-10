import { Request, Response, NextFunction } from "express";

const REQUIRED_STRINGS = ["title", "description", "location", "achiever_name"];

/**
 * Aturan create dan update sama persis, bedanya hanya create mewajibkan field
 * terisi sementara update boleh mengirim sebagian (partial).
 */
const collectErrors = (body: any, partial: boolean): string[] => {
  const errors: string[] = [];

  // Kolom-kolom ini NOT NULL di database — kalau lolos ke Prisma hasilnya 500, bukan 400.
  for (const field of REQUIRED_STRINGS) {
    const value = body[field];

    if (value === undefined && partial) continue;

    if (!value || typeof value !== "string" || value.trim() === "") {
      errors.push(`${field} wajib diisi dan harus berupa string`);
    }
  }

  const { achievement_date, achievement_end_date, level, foto_urls } = body;

  if (achievement_date === undefined && partial) {
    // biarkan
  } else if (!achievement_date || isNaN(Date.parse(achievement_date))) {
    errors.push("achievement_date wajib diisi dengan format ISO 8601");
  }

  if (achievement_end_date !== undefined && achievement_end_date !== null) {
    if (isNaN(Date.parse(achievement_end_date))) {
      errors.push("achievement_end_date format tidak valid (gunakan ISO 8601)");
    } else if (
      achievement_date &&
      !isNaN(Date.parse(achievement_date)) &&
      Date.parse(achievement_end_date) < Date.parse(achievement_date)
    ) {
      errors.push("achievement_end_date tidak boleh sebelum achievement_date");
    }
  }

  if (level !== undefined && level !== null && typeof level !== "string") {
    errors.push("level harus berupa string");
  }

  if (foto_urls !== undefined) {
    if (!Array.isArray(foto_urls)) {
      errors.push("foto_urls harus berupa array");
    } else if (
      foto_urls.some((url: any) => typeof url !== "string" || url.trim() === "")
    ) {
      errors.push("Semua item dalam foto_urls harus berupa string URL yang valid");
    }
  }

  return errors;
};

const validate =
  (partial: boolean) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = collectErrors(req.body ?? {}, partial);

    if (errors.length > 0) {
      res.status(400).json({ success: false, message: "Validasi gagal", errors });
      return;
    }

    next();
  };

export const validateCreateAchievement = validate(false);
export const validateUpdateAchievement = validate(true);
export const validateDeleteAchievement = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();
};
