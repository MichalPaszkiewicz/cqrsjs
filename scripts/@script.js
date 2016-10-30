var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// class Bob extends AggregateRoot{
//     constructor(){
//         super();
//         // you must do this to ensure action performs on correct object
//         var self = this;
//         this.registerEventAction(new EventAction("lol", (e: Framework.Event) => {
//             self.ID = e.AggregateRootID;
//         }));
//     }
// }
//# sourceMappingURL=@script.js.map