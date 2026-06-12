import { Request, Response, NextFunction } from "express";

export const validateCreateAchievement = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, achievement_date, foto_urls } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("title wajib diisi dan harus berupa string");
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
  const { title, achievement_date, foto_urls } = req.body;
  const errors: string[] = [];

  if (isNaN(Number(id))) {
    errors.push("ID harus berupa angka");
  }

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    errors.push("title harus berupa string tidak kosong jika disertakan");
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