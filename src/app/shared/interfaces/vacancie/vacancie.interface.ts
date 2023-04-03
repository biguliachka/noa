export interface IVacancieRequest {
    date: string;
    name: string;
    path: string;
    tasks: string
    description: string;
    imagePath: string;
}

export interface IVacancieResponse extends IVacancieRequest {
    id: number | string;
}
