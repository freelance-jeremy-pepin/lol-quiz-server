import MapsLolApi from 'src/models/LolApi/MapsLolApi';
import ItemStatsLolApi from './ItemStatsLolApi';
import ImageLolApi from './ImageLolApi';

export default interface ItemLolApi {
    id?: number;
    name?: string;
    rune?: {
        isrune?: boolean;
        tier?: number;
        type?: string;
    };
    gold?: {
        base?: number;
        purchasable?: boolean;
        sell?: number;
        total?: number;
    };
    group?: string;
    description?: string;
    colloq?: string;
    plaintext?: string;
    consumed?: boolean;
    stacks?: number;
    depth?: number;
    consumeOnFull?: boolean;
    from?: string[];
    into?: string[];
    specialRecipe?: number;
    inStore?: boolean;
    hideFromAll?: boolean;
    requiredChampion?: string;
    requiredAlly?: string;
    stats?: ItemStatsLolApi;
    tags?: string[];
    maps?: MapsLolApi;
    image?: ImageLolApi;
}

export function createDefaultLolApiItem(): ItemLolApi {
    return {};
}
