export interface Pais {
    id?: string;
    nombre: string;
    descripcion: string;
    capital: string;
    continente: string;
    moneda: string;
    poblacion: number;
    clima: string;
    esPaisMiembroONU: boolean;
    idiomas: string[];
}

export function createEmptyPais(): Pais {
    return {
        nombre: '',
        descripcion: '',
        capital: '',
        continente: '',
        moneda: '',
        poblacion: 0,
        clima: '',
        esPaisMiembroONU: false,
        idiomas: []
    };
}