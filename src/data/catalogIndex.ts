import { CatalogCategory } from '../types/catalog';

import star from './star.json';
import citizenCincom from './citizenCincom.json';
import nomuraDs from './nomuraDs.json';
import tsugami from './tsugami.json';
import machineryParts from './machineryParts.json';
import accessories from './accessories.json';
import erColletChuck from './erColletChuck.json';


export const catalogDataMap: Record<CatalogCategory, any[]> = {
    star,
    citizenCincom,
    nomuraDs,
    tsugami,
    machineryParts,
    accessories,
    erColletChuck
};