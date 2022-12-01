export class BaseModelDto {

    public CreateDate?: Date;
    public ModifyDate?: Date;

    public FkCreatePersonId?: number;
    public FkModifyPersonId? : number;

    public CreateDateFa?:string = this.CreateDate !=null ? this.CreateDate.getDate().toString() : "";    
    public ModifyDateFa?: string = this.ModifyDate !=null ? this.ModifyDate.getDate().toString() : "";   
}
