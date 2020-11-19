import StatsLolApi from 'src/models/LolApi/StatsLolApi';
import MapsLolApi from 'src/models/LolApi/MapsLolApi';

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
    stats?: StatsLolApi;
    tags?: string[];
    maps?: MapsLolApi;
    image?: {
        full?: string;
        group?: string;
        h?: number;
        sprite?: string;
        w?: number;
        x?: number;
        y?: number;
    };
}

export function createDefaultLolApiItem(): ItemLolApi {
    return { };
}
