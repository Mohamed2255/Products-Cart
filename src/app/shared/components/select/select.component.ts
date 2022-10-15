import { Component,EventEmitter,OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
@Input() title!:string;
@Input() data:any=[];
@Output() selectitem=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  selectedvalue(event:any)
  {
    this.selectitem.emit(event);
  }
}
