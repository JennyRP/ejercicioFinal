// src/app/models/idioma.model.ts
export class Idioma {
    id!: string;
    nombre!: string;
    codigoISO!: string;
    paisesHablantes!: string[]; // Relación con países
    numeroHablantes!: number;
    esOficialONU!: boolean;
}