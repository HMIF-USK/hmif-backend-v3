import { Request, Response, NextFunction } from "express";

const VALID_SCALE_VALUES = [
  "universitas",
  "kabupaten_kota",
  "provinsi",
  "nasional",
  "internasional",
];

export const validateCreateAchievement = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, scale, achievement_date, foto_urls } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("title wajib diisi dan harus berupa string");
  }

  if (!scale) {
    errors.push("scale wajib diisi");
  } else if (!VALID_SCALE_VALUES.includes(scale)) {
    errors.push(
      `scale tidak valid. Nilai yang diterima: ${VALID_SCALE_VALUES.join(", ")}`
    );
  }

  if (achievement_date && isNaN(Date.parse(achievement_date))) {
    errors.push("achievement_date format tidak valid (gunakan ISO 8601)");
  }

  if (foto_urls !== undefined) {
    if (!Array.isArray(foto_urls)) {
      errors.push("foto_urls harus berupa array");
    } else {
      const invalidUrls = foto_urls.filter(
        (url: any) => typeof url !== "string" || url.trim() === ""
      );
      if (invalidUrls.length > 0) {
        errors.push("Semua item dalam foto_urls harus berupa string URL yang valid");
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, message: "Validasi gagal", errors });
    return;
  }

  next();
};

export const validateUpdateAchievement = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const { title, scale, achievement_date, foto_urls } = req.body;
  const errors: string[] = [];

  if (isNaN(Number(id))) {
    errors.push("ID harus berupa angka");
  }

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    errors.push("title harus berupa string tidak kosong jika disertakan");
  }

  if (scale !== undefined && !VALID_SCALE_VALUES.includes(scale)) {
    errors.push(
      `scale tidak valid. Nilai yang diterima: ${VALID_SCALE_VALUES.join(", ")}`
    );
  }

  if (achievement_date !== undefined && isNaN(Date.parse(achievement_date))) {
    errors.push("achievement_date format tidak valid (gunakan ISO 8601)");
  }

  if (foto_urls !== undefined) {
    if (!Array.isArray(foto_urls)) {
      errors.push("foto_urls harus berupa array");
    } else {
      const invalidUrls = foto_urls.filter(
        (url: any) => typeof url !== "string" || url.trim() === ""
      );
      if (invalidUrls.length > 0) {
        errors.push("Semua item dalam foto_urls harus berupa string URL yang valid");
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, message: "Validasi gagal", errors });
    return;
  }

  next();
};

export const validateDeleteAchievement = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ success: false, message: "ID harus berupa angka" });
    return;
  }

  next();
};