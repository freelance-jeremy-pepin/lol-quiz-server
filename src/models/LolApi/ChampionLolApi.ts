import ChampionSpellLolApi from 'src/models/LolApi/ChampionSpellLolApi';
import ChampionSkinLolApi from './ChampionSkinLolApi';
import ChampionStatsLolApi from './ChampionStatsLolApi';
import ImageLolApi from './ImageLolApi';

export default interface ChampionLolApi {
    version?: string;
    id?: number;
    key?: string;
    name: string;
    title?: string;
    blurb?: string;
    info?: {
        attack?: number;
        defense?: number;
        magic?: number;
        difficulty?: number;
    };
    image?: ImageLolApi;
    skins?: ChampionSkinLolApi[];
    tags?: string[];
    partype?: string;
    stats?: ChampionStatsLolApi;
    lore?: string;
    allytips?: string[];
    enemytips?: string[];
    spells?: ChampionSpellLolApi[];
    passive: ChampionSpellLolApi;
}

export enum ImageTypesChampionLolApi {
    splash = 'splash',
    loading = 'loading',
}

export enum SkinTypes {
    onlyDefault = 'only default',
    allWithoutDefault = 'all without default',
    all = 'all',
}
