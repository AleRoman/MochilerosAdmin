import { Destino } from './destino.model';

export interface Actividad {
    id: string;
    nombre: string;
    descripcion: string;
    precio_promedio: number;
    locacion: string;
    urlImage: string;

    destinoReference: string;
}
