"use strict";(self.webpackChunkuplogistix=self.webpackChunkuplogistix||[]).push([[967],{9967:(S,_,a)=>{a.r(_),a.d(_,{ConducteursModule:()=>F});var c=a(9808),g=a(3072),d=a(5861),e=a(1223),b=a(4741),f=a(6448),Z=a(8368),C=a(5882),v=a(9584),s=a(3075);function T(o,u){if(1&o&&(e.TgZ(0,"div",67),e._uU(1),e._UZ(2,"button",68),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.message," ")}}function A(o,u){if(1&o){const t=e.EpF();e.TgZ(0,"tr")(1,"td",69),e._uU(2),e.qZA(),e.TgZ(3,"td",70),e._uU(4),e.qZA(),e.TgZ(5,"td",71),e._uU(6),e.qZA(),e.TgZ(7,"td",72),e._uU(8),e.qZA(),e.TgZ(9,"td",73),e._uU(10),e.qZA(),e.TgZ(11,"td",74),e._uU(12),e.qZA(),e.TgZ(13,"td",75),e._uU(14),e.qZA(),e.TgZ(15,"td",76),e._uU(16),e.qZA(),e.TgZ(17,"td",77),e._uU(18),e.ALo(19,"date"),e.qZA(),e.TgZ(20,"td",76),e._uU(21),e.qZA(),e.TgZ(22,"td",78)(23,"button",79),e.NdJ("click",function(){const r=e.CHM(t).$implicit;return e.oxw().getConducteur(r.id)}),e._UZ(24,"i",80),e.qZA(),e.TgZ(25,"button",81),e.NdJ("click",function(){const r=e.CHM(t).$implicit;return e.oxw().singleConducteur.id=r.id}),e._UZ(26,"i",82),e.qZA()()()}if(2&o){const t=u.$implicit;e.xp6(2),e.Oqu(t.nom),e.xp6(2),e.Oqu(t.prenom),e.xp6(2),e.Oqu(t.matricule),e.xp6(2),e.Oqu(t.tel),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(t.n_badge),e.xp6(2),e.Oqu(t.cni),e.xp6(2),e.Oqu(t.categorie_permis),e.xp6(2),e.Oqu(e.xi3(19,10,t.date_expiration,"dd/MM/yyyy")),e.xp6(3),e.Oqu(t.adresse)}}const M=function(o){return{active:o}},p=function(o){return["/conducteurs/page",o]};function q(o,u){if(1&o&&(e.TgZ(0,"li",89)(1,"a",90),e._uU(2),e.qZA()()),2&o){const t=u.index,n=e.oxw(2);e.Q6J("ngClass",e.VKq(3,M,n.conducteurs.current_page==t+1)),e.xp6(1),e.Q6J("routerLink",e.VKq(5,p,t+1)),e.xp6(1),e.Oqu(t+1)}}const h=function(o){return{_disabled:o}},y=function(){return[]};function x(o,u){if(1&o&&(e.TgZ(0,"nav",83)(1,"ul",84)(2,"li",85)(3,"a",86),e._uU(4," Pr\xe9c\xe9dent "),e.qZA()(),e.YNc(5,q,3,7,"li",87),e.TgZ(6,"li",85)(7,"a",88),e._uU(8," Suivant "),e.qZA()()()()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("routerLink",e.VKq(5,p,t.conducteurs.current_page-1))("ngClass",e.VKq(7,h,1==t.conducteurs.current_page)),e.xp6(2),e.Q6J("ngForOf",e.DdM(9,y).constructor(t.conducteurs.total_pages)),e.xp6(2),e.Q6J("routerLink",e.VKq(10,p,t.conducteurs.current_page+1))("ngClass",e.VKq(12,h,t.conducteurs.current_page==t.conducteurs.total_pages))}}function U(o,u){1&o&&(e.TgZ(0,"strong",51),e._uU(1,"*"),e.qZA())}function J(o,u){if(1&o&&(e.TgZ(0,"option",91),e._uU(1),e.qZA()),2&o){const t=u.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.matricule)}}function N(o,u){1&o&&(e.TgZ(0,"strong",51),e._uU(1,"*"),e.qZA())}const O=[{path:"",children:[{path:"page/:page",component:(()=>{class o{constructor(t,n,i,r,l,m){this.securiteClass=t,this.globale=n,this.authService=i,this.conducteurService=r,this.activatedRoute=l,this.vehiculeService=m,this.message=null,this.page=0,this.conducteurs=[],this.pays=[],this.regions=[],this.villes=[],this.vehicules=[],this.singleConducteur={id:null,nom:null,prenom:null,cni:null,email:null,tel:null,password:null,adresse:null,ville_id:null,n_badge:null,region_id:null,pays_id:null,locked_by:null,date_expiration:null,categorie_permis:null,vehicule_id:null,n_permis:null}}ngOnInit(){this.activatedRoute.params.subscribe(t=>{this.page=t.page,this.page&&this.getAllConducteurs(),this.getAllVehicules()})}clear(){this.message=null,this.singleConducteur={id:null,nom:null,prenom:null,cni:null,email:null,tel:null,password:null,adresse:null,ville_id:null,n_badge:null,region_id:null,pays_id:null,locked_by:null,date_expiration:null,categorie_permis:null,vehicule_id:null,n_permis:null}}getAllVehicules(){var t=this;this.vehiculeService.getAll().subscribe(n=>{let i=[];if(this.conducteurs.records.filter(l=>null!=l.vehicule_id).forEach(l=>i.push(l.vehicule_id)),this.vehicules=n.filter(l=>!i.includes(l.id)),this.singleConducteur.vehicule_id){let l=n.filter(m=>m.id==this.singleConducteur.vehicule_id);this.vehicules.push(l[0])}},function(){var n=(0,d.Z)(function*(i){401==i.status&&(yield t.securiteClass.refreshToken())&&t.getAllVehicules()});return function(i){return n.apply(this,arguments)}}())}getAllConducteurs(){var t=this;this.conducteurService.getAll(this.page).subscribe(n=>this.conducteurs=n,function(){var n=(0,d.Z)(function*(i){401==i.status&&(yield t.securiteClass.refreshToken())&&t.getAllConducteurs()});return function(i){return n.apply(this,arguments)}}())}getConducteur(t){var n=this;this.message=null,this.conducteurService.getConducteur(t).subscribe(i=>{this.singleConducteur=i,this.getAllVehicules()},function(){var i=(0,d.Z)(function*(r){401==r.status&&(yield n.securiteClass.refreshToken())&&n.getConducteur(t)});return function(r){return i.apply(this,arguments)}}())}update(t){var n=this;t.id?this.conducteurService.update(t).subscribe(i=>{this.getAllConducteurs(),this.message="Le conducteur est modifi\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var i=(0,d.Z)(function*(r){401==r.status&&(yield n.securiteClass.refreshToken())&&n.update(t)});return function(r){return i.apply(this,arguments)}}()):this.conducteurService.create(t).subscribe(i=>{this.getAllConducteurs(),this.message="Le conducteur est ajout\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var i=(0,d.Z)(function*(r){401==r.status&&(yield n.securiteClass.refreshToken())&&n.update(t)});return function(r){return i.apply(this,arguments)}}())}delete(){var t=this;this.conducteurService.delete(this.singleConducteur.id).subscribe(n=>{this.getAllConducteurs(),this.message="Le conducteur est supprim\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var n=(0,d.Z)(function*(i){401==i.status&&(yield t.securiteClass.refreshToken())&&t.delete()});return function(i){return n.apply(this,arguments)}}())}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(b.z),e.Y36(f.N),e.Y36(Z.e),e.Y36(C.b),e.Y36(g.gz),e.Y36(v.t))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-globale"]],decls:139,vars:22,consts:[[1,"page-clients"],[1,"header-body","shadow-sm","p-3","mb-5","bg-white","rounded"],[1,"align-items-end"],[1,"header-pretitle"],[1,"header-title"],[1,"container-fluid"],[1,"row"],[1,"col-md-12"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-edit",1,"btn","btn-outline-primary","mb-2","btn-ajouter",3,"click"],[1,"fa-solid","fa-plus"],["class","alert alert-success","role","alert",4,"ngIf"],[1,"table-responsive","row"],[1,"table","table-sm","table-nowrap","card-table"],[1,"list"],[4,"ngFor","ngForOf"],["aria-label","Page navigation","class","pag-tab col-md-12",4,"ngIf"],["id","modal-edit","tabindex","-1","role","dialog","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],["data-list","",1,"modal-card","card"],[1,"card-header"],["id","exampleModalCenterTitle",1,"card-header-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close","pb-0","mp-0"],[1,"card-body"],[1,"p-3","bg-white","rounded",3,"ngSubmit"],["conducteurForm","ngForm"],["type","hidden","name","id","value","singleConducteur.id",3,"ngModel","ngModelChange"],[1,"col-md-4"],[1,"form-group"],["for","nom",1,"form-label"],["class","text-danger",4,"ngIf"],["type","text","placeholder","Nom","name","nom","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","email",1,"form-label"],["type","email","placeholder","Email","name","email",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","categorie_permis",1,"form-label"],["type","text","placeholder","Type de permis","name","categorie_permis",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","pays_id",1,"form-label"],["name","vehicule_id",1,"form-select","form-select-sm",3,"ngModel","ngModelChange"],["value","null","disabled",""],[3,"value",4,"ngFor","ngForOf"],["for","prenom",1,"form-label"],["type","text","placeholder","Pr\xe9nom","name","prenom","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","tel",1,"form-label"],["type","text","placeholder","tel","name","tel",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["type","date","name","date_expiration",1,"form-control","form-control-sm",3,"ngModel"],["for","cni",1,"form-label"],["type","text","placeholder","CNI","name","cni",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["type","text","placeholder","N\xb0 permis","name","n_permis",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["type","text","placeholder","N\xb0 badge","name","n_badge",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","pwd",1,"form-label"],["name","adresse",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],[1,"text-danger"],["type","submit",1,"btn","btn-success","mb-2","float-right",3,"disabled"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary","float-right",2,"margin-right","5px"],["id","modal-delete","tabindex","-1","role","dialog","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-confirm"],[1,"modal-header","flex-column"],[1,"icon-box"],[1,"material-icons"],[1,"fa-solid","fa-x"],[1,"modal-title","w-100"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"close","btn-close"],[1,"modal-body"],[1,"fa-solid","fa-question"],[1,"modal-footer","justify-content-center"],["type","button","data-dismiss","modal","data-bs-dismiss","modal","aria-label","Close",1,"btn","btn-secondary"],["type","button",1,"btn","btn-danger",3,"click"],["role","alert",1,"alert","alert-success"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn-close","pb-0","mp-0"],[1,"nom"],[1,"prenom"],[1,"matricule"],[1,"phone"],[1,"email"],[1,"n_badge"],[1,"cni"],[1,"categorie_permis"],[1,"date_expiration"],["width","75"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-edit",1,"btn","btn-operation",3,"click"],[1,"fa-solid","fa-pen"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-delete",1,"btn","btn-operation",3,"click"],[1,"fa-solid","fa-trash"],["aria-label","Page navigation",1,"pag-tab","col-md-12"],[1,"pagination"],[1,"page-item"],["href","#!",1,"page-link",3,"routerLink","ngClass"],["class","page-item",3,"ngClass",4,"ngFor","ngForOf"],[1,"page-link",3,"routerLink","ngClass"],[1,"page-item",3,"ngClass"],[1,"page-link",3,"routerLink"],[3,"value"]],template:function(t,n){if(1&t){const i=e.EpF();e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"h6",3),e._uU(4," Conducteurs "),e.qZA(),e.TgZ(5,"h2",4),e._uU(6," Liste des conducteurs "),e.qZA()()(),e.TgZ(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return n.clear()}),e._UZ(11,"i",9),e.qZA(),e._UZ(12,"br")(13,"br")(14,"br"),e.YNc(15,T,3,1,"div",10),e.TgZ(16,"div",11)(17,"table",12)(18,"thead")(19,"tr")(20,"th"),e._uU(21,"Nom"),e.qZA(),e.TgZ(22,"th"),e._uU(23,"Pr\xe9nom"),e.qZA(),e.TgZ(24,"th"),e._uU(25,"V\xe9hicule attribu\xe9"),e.qZA(),e.TgZ(26,"th"),e._uU(27,"Phone"),e.qZA(),e.TgZ(28,"th"),e._uU(29,"Email"),e.qZA(),e.TgZ(30,"th"),e._uU(31,"Badge"),e.qZA(),e.TgZ(32,"th"),e._uU(33,"CNI"),e.qZA(),e.TgZ(34,"th"),e._uU(35,"Type permis"),e.qZA(),e.TgZ(36,"th"),e._uU(37,"Date d'expiration"),e.qZA(),e.TgZ(38,"th"),e._uU(39,"Address"),e.qZA(),e.TgZ(40,"th"),e._uU(41,"Options"),e.qZA()()(),e.TgZ(42,"tbody",13),e.YNc(43,A,27,13,"tr",14),e.qZA()(),e.YNc(44,x,9,14,"nav",15),e.qZA()()()(),e.TgZ(45,"div",16)(46,"div",17)(47,"div",18)(48,"div",19)(49,"div",20)(50,"h4",21),e._uU(51," Conducteur "),e.qZA(),e._UZ(52,"button",22),e.qZA(),e.TgZ(53,"div",23)(54,"form",24,25),e.NdJ("ngSubmit",function(){e.CHM(i);const l=e.MAs(55);return n.update(l.value)}),e.TgZ(56,"div",6)(57,"input",26),e.NdJ("ngModelChange",function(l){return n.singleConducteur.id=l}),e.qZA(),e.TgZ(58,"div",27)(59,"div",28)(60,"label",29),e._uU(61," Nom "),e.YNc(62,U,2,0,"strong",30),e.qZA(),e.TgZ(63,"input",31),e.NdJ("ngModelChange",function(l){return n.singleConducteur.nom=l}),e.qZA()(),e.TgZ(64,"div",28)(65,"label",32),e._uU(66,"Email"),e.qZA(),e.TgZ(67,"input",33),e.NdJ("ngModelChange",function(l){return n.singleConducteur.email=l}),e.qZA()(),e.TgZ(68,"div",28)(69,"label",34),e._uU(70,"Type de permis"),e.qZA(),e.TgZ(71,"input",35),e.NdJ("ngModelChange",function(l){return n.singleConducteur.categorie_permis=l}),e.qZA()(),e.TgZ(72,"div",28)(73,"label",36),e._uU(74,"V\xe9hicles"),e.qZA(),e.TgZ(75,"select",37),e.NdJ("ngModelChange",function(l){return n.singleConducteur.vehicule_id=l}),e.TgZ(76,"option",38),e._uU(77,"Veuillez choisir..."),e.qZA(),e.YNc(78,J,2,2,"option",39),e.qZA()()(),e.TgZ(79,"div",27)(80,"div",28)(81,"label",40),e._uU(82," Pr\xe9nom "),e.YNc(83,N,2,0,"strong",30),e.qZA(),e.TgZ(84,"input",41),e.NdJ("ngModelChange",function(l){return n.singleConducteur.prenom=l}),e.qZA()(),e.TgZ(85,"div",28)(86,"label",42),e._uU(87,"Tel"),e.qZA(),e.TgZ(88,"input",43),e.NdJ("ngModelChange",function(l){return n.singleConducteur.tel=l}),e.qZA()(),e.TgZ(89,"div",28)(90,"label",29),e._uU(91,"Date expiration"),e.qZA(),e._UZ(92,"input",44),e.ALo(93,"date"),e.qZA()(),e.TgZ(94,"div",27)(95,"div",28)(96,"label",45),e._uU(97,"CNI"),e.qZA(),e.TgZ(98,"input",46),e.NdJ("ngModelChange",function(l){return n.singleConducteur.cni=l}),e.qZA()(),e.TgZ(99,"div",28)(100,"label",45),e._uU(101,"N\xb0 permis"),e.qZA(),e.TgZ(102,"input",47),e.NdJ("ngModelChange",function(l){return n.singleConducteur.n_permis=l}),e.qZA()(),e.TgZ(103,"div",28)(104,"label",45),e._uU(105,"N\xb0 badge"),e.qZA(),e.TgZ(106,"input",48),e.NdJ("ngModelChange",function(l){return n.singleConducteur.n_badge=l}),e.qZA()()(),e.TgZ(107,"div",28)(108,"label",49),e._uU(109,"Adresse"),e.qZA(),e.TgZ(110,"textarea",50),e.NdJ("ngModelChange",function(l){return n.singleConducteur.adresse=l}),e.qZA()(),e.TgZ(111,"div",7)(112,"small",51),e._uU(113,"*: Ces champs sont obligatoires."),e.qZA(),e.TgZ(114,"button",52),e._uU(115,"Enregister"),e.qZA(),e.TgZ(116,"button",53),e._uU(117,"Annuler"),e.qZA()()()()()()()()(),e.TgZ(118,"div",54)(119,"div",55)(120,"div",18)(121,"div",56)(122,"div",57)(123,"i",58),e._UZ(124,"i",59),e.qZA()(),e.TgZ(125,"h4",60),e._uU(126,"\xcates-vous s\xfbr?"),e.qZA(),e._UZ(127,"button",61),e.qZA(),e.TgZ(128,"div",62)(129,"p"),e._uU(130,"Voulez-vous vraiment supprimer ce conducteur "),e._UZ(131,"i",63),e.qZA()(),e.TgZ(132,"div",64)(133,"button",65),e._uU(134,"Annuler"),e.qZA(),e.TgZ(135,"button",66),e.NdJ("click",function(){return n.delete()}),e._uU(136,"Supprimer"),e.qZA()()()()(),e._UZ(137,"br")(138,"br"),e.qZA()}if(2&t){const i=e.MAs(55);e.xp6(15),e.Q6J("ngIf",n.message),e.xp6(28),e.Q6J("ngForOf",n.conducteurs.records),e.xp6(1),e.Q6J("ngIf",n.conducteurs.total_records&&n.conducteurs.total_pages>1),e.xp6(13),e.Q6J("ngModel",n.singleConducteur.id),e.xp6(5),e.Q6J("ngIf",!n.singleConducteur.nom),e.xp6(1),e.Q6J("ngModel",n.singleConducteur.nom),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.email),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.categorie_permis),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.vehicule_id),e.xp6(3),e.Q6J("ngForOf",n.vehicules),e.xp6(5),e.Q6J("ngIf",!n.singleConducteur.prenom),e.xp6(1),e.Q6J("ngModel",n.singleConducteur.prenom),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.tel),e.xp6(4),e.Q6J("ngModel",e.xi3(93,19,n.singleConducteur.date_expiration,"yyyy-MM-dd")),e.xp6(6),e.Q6J("ngModel",n.singleConducteur.cni),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.n_permis),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.n_badge),e.xp6(4),e.Q6J("ngModel",n.singleConducteur.adresse),e.xp6(4),e.Q6J("disabled",!i.valid)}},directives:[c.O5,c.sg,g.yS,c.mk,s._Y,s.JL,s.F,s.Fj,s.JJ,s.On,s.Q7,s.EJ,s.YN,s.Kr],pipes:[c.uU],styles:[".modal-dialog[_ngcontent-%COMP%]{max-width:900px!important}.form-select-sm[_ngcontent-%COMP%]{font-size:.93rem!important}label.form-label[_ngcontent-%COMP%]{font-size:14px;margin-bottom:0}"]}),o})(),canActivate:[a(8299).I],data:{title:"Gestion des conducteurs"}}]}];let k=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[g.Bz.forChild(O)],g.Bz]}),o})(),F=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.ez,k,s.u5]]}),o})()}}]);