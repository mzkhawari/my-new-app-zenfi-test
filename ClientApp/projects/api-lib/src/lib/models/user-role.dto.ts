import { BaseModelDto } from "./base-model.dto";

export class UserRoleDto extends BaseModelDto  {

    constructor(
        public Id? : number,
        public Title?: string,
        public Description?:string,
        public IsActive?:boolean
    ){        
        super();
    }
}
