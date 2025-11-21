export class Asset{
    constructor(
        public id:string,
        public assetType: string,
        public symbol: string,
        public name: string,
        public baseCurrency: string,
        public categories: string[],
        public quoteCurrency?: string,
        
    ){

    }
}