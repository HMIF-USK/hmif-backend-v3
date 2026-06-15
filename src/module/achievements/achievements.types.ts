export interface AchievementResponse {
  id: string;
  title: string;
  location: string;
  description: string;
  achiever_name: string;
  achievement_date: Date;
  created_by_user_id: string;
  created_at: Date;
  fotoAchievements: Array<{
    id: string;
    url: string;
  }>;
}

export interface GetAchievementsQuery {
  limit?: number;
}
