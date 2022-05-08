export interface Comment {
    id: string;
    username: string;
    comment: string;
    date: Date;
    recipeId?: string;
}