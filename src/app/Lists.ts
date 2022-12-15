export class Lists {

    context:string;
    device:string;
    event:number;
    firstoccurrencetime:string;
    lastoccurrencetime:string;
    occurrencecount:number;
    persisttime:string;
    receivetime:string;
    state:string;

    constructor(context: string,device: string,event: number,firstoccurrencetime: string,lastoccurrencetime: string,occurrencecount: number,persisttime: string,receivetime: string,state: string)
    {
        this.context=context;
        this.device=device;
        this.event=event;
        this.firstoccurrencetime=firstoccurrencetime;
        this.lastoccurrencetime=lastoccurrencetime;
        this.occurrencecount=occurrencecount;
        this.persisttime=persisttime;
        this.receivetime=receivetime;
        this.state=state;
    }

}