

export class  Todo {
     private _userID: number;
 
     private _id: number;


     private _title: string;

     private _completed: boolean;


     constructor(todo:any) {
          this._userID = todo.userID;
          this._id = todo.id;
          this._title = todo.title;
          this._completed = todo.completed;
     }



     public get userID(): number {
          return this._userID;
     }


     public get id(): number {
          return this._id;
     }


     public get title(): string {
          return this._title;
     }


     public get completed(): boolean {
          return this._completed;
     }
 

     public set completed(val: boolean) {
          this._completed = val;
     }

}