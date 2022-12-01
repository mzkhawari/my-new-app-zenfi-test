export class AccessItemDto   {

    constructor(
        public Id? : number,
        public Key?: string,
        public IsShow?: boolean,
        public IsEdit?: boolean,
        public IsAdd?: boolean,
        public IsDelete?: boolean,
        public UrlRequest?: string,
    
    ){        
    }
}
