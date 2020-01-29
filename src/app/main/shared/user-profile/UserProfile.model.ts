import { Badge } from './badges/badge.model';

export class UserProfile {

    constructor(
        public username: string,
        public user_avatar: string,
        public score: number,
        public no_of_bronze_badges: number,
        public no_of_silver_badges: number,
        public no_of_gold_badges: number,
        public badge_list_bronze?: Badge[],
        public badge_list_silver?: Badge[],
        public badge_list_gold?: Badge[],
    ) { }
}
