export interface Pais {
    id?: string;
    nombre: string;
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
        capital: '',
        continente: '',
        moneda: '',
        poblacion: 0,
        clima: '',
        esPaisMiembroONU: false,
        idiomas: []
    };
}