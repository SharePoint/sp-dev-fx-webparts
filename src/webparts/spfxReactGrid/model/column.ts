import GridRowStatus from "./GridRowStatus";
export default class Column {
    public constructor(
        public key:string,
        public name: string,
        public editable: boolean=true,
        public gridRowStatus :GridRowStatus=GridRowStatus.new)
        { }
}
