export default interface ChampionSpellLolApi {
    id: number,
    name: string,
    description: string,
    tooltip: string,
    image: {
        full: string,
        sprite: string,
        group: string,
        x: number,
        y: number,
        w: number,
        h: number,
    },
    isPassive: boolean,
    abilityKey: string,
}
