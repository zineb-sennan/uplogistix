"use strict";(self.webpackChunkuplogistix=self.webpackChunkuplogistix||[]).push([[186],{1186:(de,Z,c)=>{c.r(Z),c.d(Z,{FournisseursModule:()=>ae});var d=c(9808),l=c(3075),g=c(3072),_=c(8299),u=c(5861),e=c(1223),v=c(4741),b=c(6448),x=c(7009),C=c(1840),T=c(9324),y=c(9421);function q(o,r){if(1&o&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.nom)}}function F(o,r){if(1&o&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.nom)}}function U(o,r){if(1&o&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.nom)}}const J=function(o){return["/fournisseurs/",o,"edit"]};function E(o,r){if(1&o&&(e.TgZ(0,"tr")(1,"td",34),e._uU(2),e.qZA(),e.TgZ(3,"td",35),e._uU(4),e.qZA(),e.TgZ(5,"td",36),e._uU(6),e.qZA(),e.TgZ(7,"td",37),e._uU(8),e.qZA(),e.TgZ(9,"td",38),e._uU(10),e.qZA(),e.TgZ(11,"td",39)(12,"a",40),e._UZ(13,"i",41),e.qZA()()()),2&o){const t=r.$implicit;e.xp6(2),e.hij(" ",t.raison_sociale," "),e.xp6(2),e.hij(" ",t.email," "),e.xp6(2),e.hij(" ",t.tel," "),e.xp6(2),e.hij(" ",t.fax," "),e.xp6(2),e.hij(" ",t.ville," "),e.xp6(2),e.Q6J("routerLink",e.VKq(6,J,t.id))}}const I=function(o){return{active:o}},p=function(o){return["/fournisseurs/page",o]};function N(o,r){if(1&o&&(e.TgZ(0,"li",48)(1,"a",49),e._uU(2),e.qZA()()),2&o){const t=r.index,n=e.oxw(2);e.Q6J("ngClass",e.VKq(3,I,n.fournisseurs.current_page==t+1)),e.xp6(1),e.Q6J("routerLink",e.VKq(5,p,t+1)),e.xp6(1),e.Oqu(t+1)}}const M=function(o){return{_disabled:o}},Q=function(){return[]};function w(o,r){if(1&o&&(e.TgZ(0,"nav",42)(1,"ul",43)(2,"li",44)(3,"a",45),e._uU(4," Pr\xe9c\xe9dent "),e.qZA()(),e.YNc(5,N,3,7,"li",46),e.TgZ(6,"li",44)(7,"a",47),e._uU(8," Suivant "),e.qZA()()()()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("routerLink",e.VKq(5,p,t.fournisseurs.current_page-1))("ngClass",e.VKq(7,M,1==t.fournisseurs.current_page)),e.xp6(2),e.Q6J("ngForOf",e.DdM(9,Q).constructor(t.fournisseurs.total_pages)),e.xp6(2),e.Q6J("routerLink",e.VKq(10,p,t.fournisseurs.current_page+1))("ngClass",e.VKq(12,M,t.fournisseurs.current_page==t.fournisseurs.total_pages))}}const k=function(){return["/fournisseurs/edit"]},Y=function(){return{"border-radius":0}};let S=(()=>{class o{constructor(t,n,i,s,a,f,h){this.securiteClass=t,this.globale=n,this.fournisseursService=i,this.activatedRoute=s,this.paysService=a,this.regionsService=f,this.villesService=h,this.page=null,this.pays=[],this.regions=[],this.villes=[],this.fournisseurs={total_records:null,current_page:null,total_pages:null,records:[]},this.search={pays_id:"",region_id:"",ville_id:"",filtre:null}}ngOnInit(){this.activatedRoute.params.subscribe(t=>{this.page=t.page,this.page&&this.searchFournisseur(this.search),this.getAllPays()})}getAllPays(){var t=this;this.paysService.getAll().subscribe(n=>this.pays=n,function(){var n=(0,u.Z)(function*(i){401==i.status&&(yield t.securiteClass.refreshToken())&&t.getAllPays()});return function(i){return n.apply(this,arguments)}}())}getRegionsByPays(t){var n=this;this.regions=[],this.regionsService.regionsByPays(t).subscribe(i=>{this.regions=i,this.villes=[]},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getRegionsByPays(t)});return function(s){return i.apply(this,arguments)}}())}getVillesByRegion(t){var n=this;this.villesService.villesByRegion(t).subscribe(i=>this.villes=i,function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getVillesByRegion(t)});return function(s){return i.apply(this,arguments)}}())}changePays(t){this.getRegionsByPays(t.target.value)}changeRegion(t){this.getVillesByRegion(t.target.value)}searchFournisseur(t){var n=this;this.fournisseursService.search(t,this.page).subscribe(i=>this.fournisseurs=i,function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.searchFournisseur(t)});return function(s){return i.apply(this,arguments)}}())}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(v.z),e.Y36(b.N),e.Y36(x.Y),e.Y36(g.gz),e.Y36(C.K),e.Y36(T.E),e.Y36(y.i))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-index-client"]],decls:72,vars:13,consts:[[1,"page-clients"],[1,"header-body","shadow-sm","p-3","mb-5","bg-white","rounded"],[1,"align-items-end"],[1,"header-pretitle"],[1,"header-title"],[1,"container-fluid"],[1,"row"],[1,"col-md-12"],[1,"btn","btn-outline-primary","mb-2","btn-ajouter",3,"routerLink"],[1,"fa-solid","fa-plus"],[1,"form-search","row",3,"ngSubmit"],["searchForm","ngForm"],[1,"col-md-3"],[1,"form-group"],["for","titre"],["name","pays_id",1,"form-select",3,"ngModel","change","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],["name","region_id",1,"form-select",3,"ngModel","change","ngModelChange"],["name","ville_id",1,"form-select",3,"ngModel","ngModelChange"],[1,"form-group","input-group"],["for","filtre",2,"width","100%"],["type","text","name","filtre",1,"form-control",3,"ngModel","ngModelChange"],[1,"input-group-append"],["type","button",1,"btn","btn-outline-secondary","text-dark",3,"ngStyle","click"],[1,"fas","fa-eraser"],["type","submit",1,"btn","btn-outline-primary",2,"margin-left","12px"],[1,"fas","fa-search"],[1,"table-responsive","row"],[1,"table","table-sm","table-nowrap","card-table"],[1,"list"],[4,"ngFor","ngForOf"],["aria-label","Page navigation","class","pag-tab col-md-12",4,"ngIf"],[3,"value"],[1,"raison_sociale"],[1,"email"],[1,"tel_mobile"],[1,"fax"],[1,"ville"],["width","75"],["type","button",1,"btn","btn-operation",3,"routerLink"],[1,"fa-solid","fa-pen"],["aria-label","Page navigation",1,"pag-tab","col-md-12"],[1,"pagination"],[1,"page-item"],["href","#!",1,"page-link",3,"routerLink","ngClass"],["class","page-item",3,"ngClass",4,"ngFor","ngForOf"],[1,"page-link",3,"routerLink","ngClass"],[1,"page-item",3,"ngClass"],[1,"page-link",3,"routerLink"]],template:function(t,n){if(1&t){const i=e.EpF();e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"h6",3),e._uU(4," Fournisseur "),e.qZA(),e.TgZ(5,"h2",4),e._uU(6," Liste des fournisseurs "),e.qZA()()(),e.TgZ(7,"div",5)(8,"div",6)(9,"div",7)(10,"a",8),e._UZ(11,"i",9),e.qZA(),e._UZ(12,"br")(13,"br")(14,"br"),e.TgZ(15,"form",10,11),e.NdJ("ngSubmit",function(){e.CHM(i);const a=e.MAs(16);return n.searchFournisseur(a.value)}),e.TgZ(17,"div",12)(18,"div",13)(19,"label",14),e._uU(20,"Pays"),e.qZA(),e.TgZ(21,"select",15),e.NdJ("change",function(a){return n.changePays(a)})("ngModelChange",function(a){return n.search.pays_id=a}),e.TgZ(22,"option",16),e._uU(23,"Tous"),e.qZA(),e.YNc(24,q,2,2,"option",17),e.qZA()()(),e.TgZ(25,"div",12)(26,"div",13)(27,"label",14),e._uU(28,"R\xe9gion"),e.qZA(),e.TgZ(29,"select",18),e.NdJ("change",function(a){return n.changeRegion(a)})("ngModelChange",function(a){return n.search.region_id=a}),e.TgZ(30,"option",16),e._uU(31,"Tous"),e.qZA(),e.YNc(32,F,2,2,"option",17),e.qZA()()(),e.TgZ(33,"div",12)(34,"div",13)(35,"label",14),e._uU(36,"Ville"),e.qZA(),e.TgZ(37,"select",19),e.NdJ("ngModelChange",function(a){return n.search.ville_id=a}),e.TgZ(38,"option",16),e._uU(39,"Tous"),e.qZA(),e.YNc(40,U,2,2,"option",17),e.qZA()()(),e.TgZ(41,"div",12)(42,"div",20)(43,"label",21),e._uU(44,"Filtre"),e.qZA(),e.TgZ(45,"input",22),e.NdJ("ngModelChange",function(a){return n.search.filtre=a}),e.qZA(),e.TgZ(46,"div",23)(47,"button",24),e.NdJ("click",function(){return n.search.filtre=""}),e._UZ(48,"i",25),e.qZA(),e.TgZ(49,"button",26),e._UZ(50,"i",27),e.qZA()()()()(),e.TgZ(51,"div",28)(52,"table",29)(53,"thead")(54,"tr")(55,"th"),e._uU(56,"Raison sociale"),e.qZA(),e.TgZ(57,"th"),e._uU(58,"Email"),e.qZA(),e.TgZ(59,"th"),e._uU(60,"T\xe9l\xe9phone"),e.qZA(),e.TgZ(61,"th"),e._uU(62,"Fax"),e.qZA(),e.TgZ(63,"th"),e._uU(64,"Ville"),e.qZA(),e.TgZ(65,"th"),e._uU(66,"\xc9diter"),e.qZA()()(),e.TgZ(67,"tbody",30),e.YNc(68,E,14,8,"tr",31),e.qZA()(),e.YNc(69,w,9,14,"nav",32),e.qZA()()()(),e._UZ(70,"br")(71,"br"),e.qZA()}2&t&&(e.xp6(10),e.Q6J("routerLink",e.DdM(11,k)),e.xp6(11),e.Q6J("ngModel",n.search.pays_id),e.xp6(3),e.Q6J("ngForOf",n.pays),e.xp6(5),e.Q6J("ngModel",n.search.region_id),e.xp6(3),e.Q6J("ngForOf",n.regions),e.xp6(5),e.Q6J("ngModel",n.search.ville_id),e.xp6(3),e.Q6J("ngForOf",n.villes),e.xp6(5),e.Q6J("ngModel",n.search.filtre),e.xp6(2),e.Q6J("ngStyle",e.DdM(12,Y)),e.xp6(21),e.Q6J("ngForOf",n.fournisseurs.records),e.xp6(1),e.Q6J("ngIf",n.fournisseurs.total_records&&n.fournisseurs.total_pages>1))},directives:[g.yS,l._Y,l.JL,l.F,l.EJ,l.JJ,l.On,l.YN,l.Kr,d.sg,l.Fj,d.PC,d.O5,d.mk],styles:[".btn-ajouter[_ngcontent-%COMP%]{float:right}.pag-tab[_ngcontent-%COMP%]{box-shadow:#0000003d 0 3px 8px!important}.btn-operation[_ngcontent-%COMP%]{display:block;margin:auto}"]}),o})();var O=c(4548);const m=function(o){return{active:o}};function B(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",12)(1,"div",13)(2,"ul",14)(3,"li",15)(4,"button",16),e.NdJ("click",function(){return e.CHM(t),e.oxw().changeType("fournisseur")}),e._uU(5," Fournisseur "),e.qZA()(),e.TgZ(6,"li",15)(7,"button",16),e.NdJ("click",function(){return e.CHM(t),e.oxw().changeType("identifiants_fiscaux")}),e._uU(8," Identifiants fiscaux "),e.TgZ(9,"span",17),e._uU(10),e.qZA()()(),e.TgZ(11,"li",15)(12,"button",16),e.NdJ("click",function(){return e.CHM(t),e.oxw().changeType("contacts")}),e._uU(13," Contact "),e.TgZ(14,"span",17),e._uU(15),e.qZA()()()()(),e._UZ(16,"br")(17,"br")(18,"br")(19,"br"),e.qZA()}if(2&o){const t=e.oxw();e.xp6(4),e.Q6J("ngClass",e.VKq(5,m,"fournisseur"==t.type)),e.xp6(3),e.Q6J("ngClass",e.VKq(7,m,"identifiants_fiscaux"==t.type)),e.xp6(3),e.Oqu(t.fiscaux.length),e.xp6(2),e.Q6J("ngClass",e.VKq(9,m,"contacts"==t.type)),e.xp6(3),e.Oqu(t.contacts.length)}}function R(o,r){if(1&o&&(e.TgZ(0,"div",42),e._uU(1),e._UZ(2,"button",43),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.message," ")}}function H(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function P(o,r){if(1&o&&(e.TgZ(0,"option",44),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.nom)}}function V(o,r){if(1&o&&(e.TgZ(0,"option",44),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.nom)}}function L(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function j(o,r){if(1&o&&(e.TgZ(0,"option",44),e._uU(1),e.qZA()),2&o){const t=r.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.nom)}}const K=function(o,r){return{"btn-primary":o,"btn-danger":r}};function z(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",18),e.YNc(1,R,3,1,"div",19),e.TgZ(2,"form",20,21),e.NdJ("ngSubmit",function(){e.CHM(t);const i=e.MAs(3);return e.oxw().update(i.value)}),e.TgZ(4,"div",6)(5,"div",22)(6,"input",23),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.id=i}),e.qZA(),e.TgZ(7,"div",24)(8,"label",25),e._uU(9," Raison sociale "),e.YNc(10,H,2,0,"strong",26),e.qZA(),e.TgZ(11,"input",27),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.raison_sociale=i}),e.qZA()(),e.TgZ(12,"div",24)(13,"label",25),e._uU(14,"Region"),e.qZA(),e.TgZ(15,"select",28),e.NdJ("change",function(i){return e.CHM(t),e.oxw().changeRegion(i)}),e.TgZ(16,"option",29),e._uU(17,"Veuillez choisir..."),e.qZA(),e.YNc(18,P,2,2,"option",30),e.qZA()(),e.TgZ(19,"div",24)(20,"label",25),e._uU(21," Email "),e.qZA(),e.TgZ(22,"input",31),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.email=i}),e.qZA()(),e.TgZ(23,"div",24)(24,"label",25),e._uU(25,"Fax"),e.qZA(),e.TgZ(26,"input",32),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.fax=i}),e.qZA()()(),e.TgZ(27,"div",22)(28,"div",24)(29,"label",33),e._uU(30,"Pays"),e.qZA(),e.TgZ(31,"select",34),e.NdJ("change",function(i){return e.CHM(t),e.oxw().changePays(i)}),e.TgZ(32,"option",29),e._uU(33,"Veuillez choisir..."),e.qZA(),e.YNc(34,V,2,2,"option",30),e.qZA()(),e.TgZ(35,"div",24)(36,"label",25),e._uU(37," Ville "),e.YNc(38,L,2,0,"strong",26),e.qZA(),e.TgZ(39,"select",35),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.ville_id=i}),e.TgZ(40,"option",29),e._uU(41,"Veuillez choisir..."),e.qZA(),e.YNc(42,j,2,2,"option",30),e.qZA()(),e.TgZ(43,"div",24)(44,"label",25),e._uU(45," T\xe9l\xe9phone "),e.qZA(),e.TgZ(46,"input",36),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.tel=i}),e.qZA()()(),e.TgZ(47,"div",24)(48,"label",25),e._uU(49,"Adresse"),e.qZA(),e.TgZ(50,"textarea",37),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.adresse=i}),e.qZA()()(),e._UZ(51,"hr",38),e.TgZ(52,"small",39),e._uU(53,"*: Ces champs sont obligatoires."),e.qZA(),e.TgZ(54,"button",40),e._uU(55),e.qZA(),e.TgZ(56,"button",41),e.NdJ("click",function(){return e.CHM(t),e.oxw().fermer()}),e._uU(57,"Annuler"),e.qZA()()()}if(2&o){const t=e.MAs(3),n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.message),e.xp6(5),e.Q6J("ngModel",n.singleFournisseur.id),e.xp6(4),e.Q6J("ngIf",!n.singleFournisseur.raison_sociale),e.xp6(1),e.Q6J("ngModel",n.singleFournisseur.raison_sociale),e.xp6(4),e.Q6J("ngModel",n.singleFournisseur.region_id),e.xp6(3),e.Q6J("ngForOf",n.regions),e.xp6(4),e.Q6J("ngModel",n.singleFournisseur.email),e.xp6(4),e.Q6J("ngModel",n.singleFournisseur.fax),e.xp6(5),e.Q6J("ngModel",n.singleFournisseur.pays_id)("disabled",n.singleFournisseur.id),e.xp6(3),e.Q6J("ngForOf",n.pays),e.xp6(4),e.Q6J("ngIf",!n.singleFournisseur.ville_id),e.xp6(1),e.Q6J("ngModel",n.singleFournisseur.ville_id),e.xp6(3),e.Q6J("ngForOf",n.villes),e.xp6(4),e.Q6J("ngModel",n.singleFournisseur.tel),e.xp6(4),e.Q6J("ngModel",n.singleFournisseur.adresse),e.xp6(4),e.Q6J("ngClass",e.WLB(19,K,0==n.fiscaux.length,n.fiscaux.length>0))("disabled",!t.valid),e.xp6(1),e.hij(" ",n.singleFournisseur.id?"Enregistrer":"Cr\xe9er"," ")}}function $(o,r){if(1&o&&(e.TgZ(0,"div",42),e._uU(1),e._UZ(2,"button",43),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.message," ")}}function D(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",24)(1,"label",25),e._uU(2),e.qZA(),e.TgZ(3,"input",51),e.NdJ("ngModelChange",function(i){return e.CHM(t).$implicit.valeur=i}),e.qZA()()}if(2&o){const t=r.$implicit,n=r.index;e.xp6(2),e.Oqu(t.nom),e.xp6(1),e.MGl("name","valeur[",n,"]"),e.Q6J("ngModel",t.valeur)}}function G(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",45),e.YNc(1,$,3,1,"div",19),e.TgZ(2,"div",6)(3,"div",46)(4,"form",47,48),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().upadateIdentifiantsFiscaux()}),e.TgZ(6,"input",23),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleFournisseur.id=i}),e.qZA(),e.YNc(7,D,4,3,"div",49),e._UZ(8,"hr",38),e.TgZ(9,"button",50),e._uU(10," Enregistrer "),e.qZA(),e.TgZ(11,"button",41),e.NdJ("click",function(){return e.CHM(t),e.oxw().fermer()}),e._uU(12,"Annuler"),e.qZA()()()()()}if(2&o){const t=e.MAs(5),n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.message),e.xp6(5),e.Q6J("ngModel",n.singleFournisseur.id),e.xp6(1),e.Q6J("ngForOf",n.fiscaux),e.xp6(2),e.Q6J("disabled",!t.valid)}}function X(o,r){if(1&o&&(e.TgZ(0,"div",42),e._uU(1),e._UZ(2,"button",43),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.message," ")}}function W(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"tr")(1,"td",105),e._uU(2),e.qZA(),e.TgZ(3,"td",106),e._uU(4),e.qZA(),e.TgZ(5,"td",107),e._uU(6),e.qZA(),e.TgZ(7,"td",108),e._uU(8),e.qZA(),e.TgZ(9,"td",109),e._uU(10),e.qZA(),e.TgZ(11,"td",110),e._uU(12),e.qZA(),e.TgZ(13,"td",111),e._uU(14),e.qZA(),e.TgZ(15,"td",112),e.NdJ("click",function(){const s=e.CHM(t).$implicit;return e.oxw(2).setContact(s)}),e.TgZ(16,"button",113),e._UZ(17,"i",114),e.qZA(),e.TgZ(18,"button",115),e._UZ(19,"i",116),e.qZA()()()}if(2&o){const t=r.$implicit;e.xp6(2),e.Oqu(t.titre),e.xp6(2),e.Oqu(t.fonction),e.xp6(2),e.AsE("",t.prenom," ",t.nom,""),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(t.tel_mobile),e.xp6(2),e.Oqu(t.tel_bureau),e.xp6(2),e.Oqu(t.fax)}}function ee(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function te(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function ne(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function ie(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function oe(o,r){1&o&&(e.TgZ(0,"strong",39),e._uU(1,"*"),e.qZA())}function se(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",52)(1,"div",53)(2,"button",54),e.NdJ("click",function(){return e.CHM(t),e.oxw().clearContact()}),e._UZ(3,"i",55),e.qZA(),e._UZ(4,"br")(5,"br")(6,"br"),e.TgZ(7,"div",6),e.YNc(8,X,3,1,"div",19),e.qZA(),e.TgZ(9,"div",56)(10,"table",57)(11,"thead")(12,"tr")(13,"th"),e._uU(14,"Titre"),e.qZA(),e.TgZ(15,"th"),e._uU(16,"Fonction"),e.qZA(),e.TgZ(17,"th"),e._uU(18,"Nom complet"),e.qZA(),e.TgZ(19,"th"),e._uU(20,"Email"),e.qZA(),e.TgZ(21,"th"),e._uU(22,"Tel mobile"),e.qZA(),e.TgZ(23,"th"),e._uU(24,"Tel bureau"),e.qZA(),e.TgZ(25,"th"),e._uU(26,"Fax"),e.qZA(),e.TgZ(27,"th"),e._uU(28,"Operations"),e.qZA()()(),e.TgZ(29,"tbody",58),e.YNc(30,W,20,8,"tr",59),e.qZA()()()(),e.TgZ(31,"div",60)(32,"div",61)(33,"div",62)(34,"div",63)(35,"div",64)(36,"h4",65),e._uU(37," Contact "),e.qZA(),e._UZ(38,"button",66),e.qZA(),e.TgZ(39,"div",67)(40,"form",68,69),e.NdJ("ngSubmit",function(){e.CHM(t);const i=e.MAs(41);return e.oxw().updateContact(i.value)}),e.TgZ(42,"div",6)(43,"div",22),e._UZ(44,"input",70)(45,"input",71),e.TgZ(46,"div",24)(47,"label",72),e._uU(48," Titre "),e.YNc(49,ee,2,0,"strong",26),e.qZA(),e.TgZ(50,"select",73),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.titre=i}),e.TgZ(51,"option",29),e._uU(52,"Veuillez choisir..."),e.qZA(),e.TgZ(53,"option",74),e._uU(54,"Mr"),e.qZA(),e.TgZ(55,"option",75),e._uU(56,"Mlle"),e.qZA(),e.TgZ(57,"option",76),e._uU(58,"Mme"),e.qZA()()(),e.TgZ(59,"div",24)(60,"label",77),e._uU(61," Nom "),e.YNc(62,te,2,0,"strong",26),e.qZA(),e.TgZ(63,"input",78),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.nom=i}),e.qZA()(),e.TgZ(64,"div",24)(65,"label",79),e._uU(66," Email "),e.YNc(67,ne,2,0,"strong",26),e.qZA(),e.TgZ(68,"input",80),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.email=i}),e.qZA()(),e.TgZ(69,"div",24)(70,"label",81),e._uU(71,"Tel bureau"),e.qZA(),e.TgZ(72,"input",82),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.tel_bureau=i}),e.qZA()()(),e.TgZ(73,"div",22)(74,"div",24)(75,"label",83),e._uU(76,"Fonction"),e.qZA(),e.TgZ(77,"input",84),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.fonction=i}),e.qZA()(),e.TgZ(78,"div",24)(79,"label",85),e._uU(80," Pr\xe9nom "),e.YNc(81,ie,2,0,"strong",26),e.qZA(),e.TgZ(82,"input",86),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.prenom=i}),e.qZA()(),e.TgZ(83,"div",24)(84,"label",87),e._uU(85," Tel mobile "),e.YNc(86,oe,2,0,"strong",26),e.qZA(),e.TgZ(87,"input",88),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.tel_mobile=i}),e.qZA()(),e.TgZ(88,"div",24)(89,"label",89),e._uU(90,"Fax"),e.qZA(),e.TgZ(91,"input",90),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().singleContact.fax=i}),e.qZA()()()(),e.TgZ(92,"div",46)(93,"small",39),e._uU(94,"*: Ces champs sont obligatoires."),e.qZA(),e.TgZ(95,"button",91),e._uU(96,"Annuler"),e.qZA(),e.TgZ(97,"button",92),e._uU(98,"Enregister"),e.qZA()()()()()()()(),e.TgZ(99,"div",93)(100,"div",94)(101,"div",62)(102,"div",95)(103,"div",96)(104,"i",97),e._UZ(105,"i",98),e.qZA()(),e.TgZ(106,"h4",99),e._uU(107,"\xcates-vous s\xfbr?"),e.qZA(),e._UZ(108,"button",100),e.qZA(),e.TgZ(109,"div",101)(110,"p"),e._uU(111,"Voulez-vous vraiment supprimer ces enregistrements\xa0? Ce processus ne peut pas \xeatre annul\xe9."),e.qZA(),e._UZ(112,"br"),e.qZA(),e.TgZ(113,"div",102)(114,"button",103),e._uU(115,"Annuler"),e.qZA(),e.TgZ(116,"button",104),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return i.deleteContact(i.singleContact.id)}),e._uU(117,"Supprimer"),e.qZA()()()()()()}if(2&o){const t=e.MAs(41),n=e.oxw();e.xp6(8),e.Q6J("ngIf",n.message),e.xp6(22),e.Q6J("ngForOf",n.contacts),e.xp6(14),e.Q6J("ngModel",n.singleContact.id),e.xp6(1),e.Q6J("ngModel",n.singleFournisseur.id),e.xp6(4),e.Q6J("ngIf",!n.singleContact.titre),e.xp6(1),e.Q6J("ngModel",n.singleContact.titre),e.xp6(12),e.Q6J("ngIf",!n.singleContact.nom),e.xp6(1),e.Q6J("ngModel",n.singleContact.nom),e.xp6(4),e.Q6J("ngIf",!n.singleContact.email),e.xp6(1),e.Q6J("ngModel",n.singleContact.email),e.xp6(4),e.Q6J("ngModel",n.singleContact.tel_bureau),e.xp6(5),e.Q6J("ngModel",n.singleContact.fonction),e.xp6(4),e.Q6J("ngIf",!n.singleContact.prenom),e.xp6(1),e.Q6J("ngModel",n.singleContact.prenom),e.xp6(4),e.Q6J("ngIf",!n.singleContact.tel_mobile),e.xp6(1),e.Q6J("ngModel",n.singleContact.tel_mobile),e.xp6(4),e.Q6J("ngModel",n.singleContact.fax),e.xp6(6),e.Q6J("disabled",!t.valid)}}let A=(()=>{class o{constructor(t,n,i,s,a,f,h,ue,ce){this.securiteClass=t,this.globale=n,this.paysService=i,this.regionsService=s,this.villesService=a,this.fournisseursService=f,this.idFiscaleService=h,this.activatedRoute=ue,this.location=ce,this.pays=[],this.regions=[],this.villes=[],this.fiscaux=[],this.contacts=[],this.singleFournisseur={id:null,raison_sociale:null,adresse:null,pays_id:null,region_id:null,ville_id:null,email:null,tel:null,fax:null,nbre_balises:null},this.singleContact={id:null,client_id:null,titre:null,fonction:null,prenom:null,nom:null,email:null,tel_mobile:null,tel_bureau:null,fax:null},this.message="",this.type="fournisseur"}ngOnInit(){this.activatedRoute.params.subscribe(t=>{const{id:n}=t;n&&this.getInfosFournisseurById(n)}),this.getAllPays()}fermer(){this.location.back()}changeType(t){this.message=null,this.type=t}clear(){this.singleFournisseur={id:null,raison_sociale:null,adresse:null,nom:null,prenom:null,pays_id:null,region_id:null,ville_id:null,email:null,tel_mobile:null,tel_bureau:null,fax:null,nbre_balises:null}}getInfosFournisseurById(t){var n=this;this.fournisseursService.getFournisseur(t).subscribe(i=>{this.singleFournisseur=i,this.getRegionsByPays(this.singleFournisseur.pays_id),this.getVillesByRegion(this.singleFournisseur.region_id),this.getIdentifiantsByFournisseur(t),this.getContcatsByFournisseurId(t)},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getInfosFournisseurById(t)});return function(s){return i.apply(this,arguments)}}())}getAllPays(){var t=this;this.paysService.getAll().subscribe(n=>this.pays=n,function(){var n=(0,u.Z)(function*(i){401==i.status&&(yield t.securiteClass.refreshToken())&&t.getAllPays()});return function(i){return n.apply(this,arguments)}}())}getRegionsByPays(t){var n=this;this.regions=[],this.regionsService.regionsByPays(t).subscribe(i=>{this.regions=i,this.singleFournisseur.pays_id=t},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getRegionsByPays(t)});return function(s){return i.apply(this,arguments)}}())}getVillesByRegion(t){var n=this;this.villesService.villesByRegion(t).subscribe(i=>{this.villes=i,this.singleFournisseur.region_id=t},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getVillesByRegion(t)});return function(s){return i.apply(this,arguments)}}())}changePays(t){this.getRegionsByPays(t.target.value)}changeRegion(t){this.getVillesByRegion(t.target.value)}getIdentifiantsByFournisseur(t){var n=this;this.idFiscaleService.identifiantsByFournisseur(t).subscribe(i=>this.fiscaux=i,function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getIdentifiantsByFournisseur(t)});return function(s){return i.apply(this,arguments)}}())}updateIdentifiantsFournisseur(t){var n=this;this.idFiscaleService.updateIdentifiantsFournisseur(t).subscribe(i=>console.log(),function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.updateIdentifiantsFournisseur(t)});return function(s){return i.apply(this,arguments)}}())}update(t){var n=this;t.id?this.fournisseursService.update(t).subscribe(i=>{this.message="Le fournisseur est modifi\xe9 avec succ\xe8s !"},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.update(t)});return function(s){return i.apply(this,arguments)}}()):this.fournisseursService.create(t).subscribe(i=>{this.getInfosFournisseurById(i.id),this.message="Le fournisseur est ajout\xe9 avec succ\xe8s .",this.type="identifiants_fiscaux"},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.update(t)});return function(s){return i.apply(this,arguments)}}())}clearContact(){this.message=null,this.singleContact={id:null,client_id:null,titre:null,fonction:null,prenom:null,nom:null,email:null,tel_mobile:"",tel_bureau:"",fax:""}}getContcatsByFournisseurId(t){var n=this;this.fournisseursService.getContactByFournisseurId(t).subscribe(i=>this.contacts=i,function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.getContcatsByFournisseurId(t)});return function(s){return i.apply(this,arguments)}}())}updateContact(t){var n=this;t.id?this.fournisseursService.updateContact(t).subscribe(i=>{this.getContcatsByFournisseurId(this.singleFournisseur.id),this.message="Le contact est modifi\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.updateContact(t)});return function(s){return i.apply(this,arguments)}}()):this.fournisseursService.createContact(t).subscribe(i=>{this.getContcatsByFournisseurId(this.singleFournisseur.id),this.message="Le contact est ajout\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.updateContact(t)});return function(s){return i.apply(this,arguments)}}())}deleteContact(t){var n=this;this.fournisseursService.deleteContact(t).subscribe(i=>{this.getContcatsByFournisseurId(this.singleFournisseur.id),this.message="Le contact est supprim\xe9 avec succ\xe8s !",this.globale.closeModal()},function(){var i=(0,u.Z)(function*(s){401==s.status&&(yield n.securiteClass.refreshToken())&&n.deleteContact(t)});return function(s){return i.apply(this,arguments)}}())}setContact(t){this.message=null,this.singleContact=t}upadateIdentifiantsFiscaux(){this.fiscaux.forEach(t=>{this.updateIdentifiantsFournisseur(t)}),this.message="Les identifiants fiscaux sont ajout\xe9s avec succ\xe8s !"}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(v.z),e.Y36(b.N),e.Y36(C.K),e.Y36(T.E),e.Y36(y.i),e.Y36(x.Y),e.Y36(O.S),e.Y36(g.gz),e.Y36(d.Ye))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-edit-client"]],decls:14,vars:4,consts:[[1,"page-clients"],[1,"header-body","shadow-sm","p-3","mb-5","bg-white","rounded"],[1,"align-items-end"],[1,"header-pretitle"],[1,"header-title"],[1,"container-fluid"],[1,"row"],[1,"col-12"],["class","row align-items-center",4,"ngIf"],["class","fournisseur",4,"ngIf"],["class","identifiants_fiscaux",4,"ngIf"],["class","contacts",4,"ngIf"],[1,"row","align-items-center"],[1,"col"],[1,"nav","nav-tabs","nav-overflow","header-tabs"],[1,"nav-item"],[1,"nav-link",3,"ngClass","click"],[1,"badge","bg-info-soft"],[1,"fournisseur"],["class","alert alert-success","role","alert",4,"ngIf"],[1,"mb-4","shadow","p-3","mb-5","bg-white","rounded","frm-client",3,"ngSubmit"],["fournisseurForm","ngForm"],[1,"col-md-6"],["type","hidden","name","id",3,"ngModel","ngModelChange"],[1,"form-group"],[1,"form-label"],["class","text-danger",4,"ngIf"],["type","text","name","raison_sociale","placeholder","Raison sociale","required","",1,"form-control",3,"ngModel","ngModelChange"],["id","inputState","name","region_id",1,"form-select",3,"ngModel","change"],["value","null","disabled",""],[3,"value",4,"ngFor","ngForOf"],["type","email","name","email","placeholder","Email",1,"form-control",3,"ngModel","ngModelChange"],["type","text","name","fax","placeholder","Fax",1,"form-control",3,"ngModel","ngModelChange"],["for","pays_id",1,"form-label"],["name","pays_id",1,"form-select",3,"ngModel","disabled","change"],["id","inputState","name","ville_id","required","",1,"form-select",3,"ngModel","ngModelChange"],["type","text","name","tel","placeholder","Tel mobile",1,"form-control",3,"ngModel","ngModelChange"],["rows","3","name","adresse","placeholder","Adresse",1,"form-control",3,"ngModel","ngModelChange"],[1,"mt-4","mb-4"],[1,"text-danger"],["type","submit",1,"btn","w-10","btn-float",3,"ngClass","disabled"],["type","button",1,"btn","btn-secondary","w-10","btn-float",3,"click"],["role","alert",1,"alert","alert-success"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn-close","pb-0","mp-0"],[3,"value"],[1,"identifiants_fiscaux"],[1,"col-md-12"],[1,"mb-4","shadow","p-3","mb-5","bg-white","rounded",3,"ngSubmit"],["FiscauxForm","ngForm"],["class","form-group",4,"ngFor","ngForOf"],["type","submit",1,"btn","w-10","btn-float","btn-primary",3,"disabled"],["type","text",1,"form-control",3,"ngModel","name","ngModelChange"],[1,"contacts"],[1,"header","mt-md-3"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-edit",1,"btn","btn-outline-primary","mb-2","btn-add-contact",3,"click"],[1,"fa-solid","fa-plus"],[1,"table-responsive","row"],[1,"table","table-sm","table-nowrap","card-table"],[1,"list"],[4,"ngFor","ngForOf"],["id","modal-edit","tabindex","-1","role","dialog","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],["data-list","",1,"modal-card","card"],[1,"card-header"],[1,"card-header-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close","pb-0","mp-0"],[1,"card-body"],[3,"ngSubmit"],["contactForm","ngForm"],["type","hidden","name","id",3,"ngModel"],["type","hidden","name","fournisseur_id",3,"ngModel"],["for","titre",1,"form-label"],["name","titre","required","",1,"form-select","form-select-sm",3,"ngModel","ngModelChange"],["value","Mr"],["value","Mlle"],["value","Mme"],["for","nom",1,"form-label"],["type","text","placeholder","Nom","name","nom","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","email",1,"form-label"],["type","email","id","error_email","placeholder","Email","name","email","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","tel_bureau",1,"form-label"],["type","text","placeholder","Tel bureau","name","tel_bureau",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","fonction",1,"form-label"],["type","text","placeholder","Fonction","name","fonction",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","prenom",1,"form-label"],["type","text","placeholder","Prenom","name","prenom","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","tel_mobile",1,"form-label"],["type","text","placeholder","Tel mobile","name","tel_mobile","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["for","fax",1,"form-label"],["type","text","placeholder","fax","name","fax",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],["type","button","data-dismiss","modal","data-bs-dismiss","modal","aria-label","Close",1,"btn","btn-secondary","float-right"],["type","submit",1,"btn","btn-success","mb-2","float-right","mr-5",2,"margin-right","6px",3,"disabled"],["id","modal-delete","tabindex","-1","role","dialog","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-confirm"],[1,"modal-header","flex-column"],[1,"icon-box"],[1,"material-icons"],[1,"fa-solid","fa-x"],[1,"modal-title","w-100"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"close","btn-close"],[1,"modal-body"],[1,"modal-footer","justify-content-center"],["type","button","data-dismiss","modal","data-bs-dismiss","modal","aria-label","Close",1,"btn","btn-secondary"],["type","button",1,"btn","btn-danger",3,"click"],[1,"titre"],[1,"fonction"],[1,"nom","complet"],[1,"email"],[1,"tel_mobile"],[1,"tel_bureau"],[1,"fax"],["width","75",3,"click"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-edit",1,"btn","btn-operation"],[1,"fa-solid","fa-pen"],["type","button","data-bs-toggle","modal","data-bs-target","#modal-delete",1,"btn","btn-operation"],[1,"fa-solid","fa-trash"]],template:function(t,n){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"h6",3),e._uU(4," Fournisseurs "),e.qZA(),e.TgZ(5,"h2",4),e._uU(6," Gestion des fournisseur "),e.qZA()()(),e.TgZ(7,"div",5)(8,"div",6)(9,"div",7),e.YNc(10,B,20,11,"div",8),e.YNc(11,z,58,22,"div",9),e.YNc(12,G,13,4,"div",10),e.YNc(13,se,118,18,"div",11),e.qZA()()()()),2&t&&(e.xp6(10),e.Q6J("ngIf",n.singleFournisseur.id),e.xp6(1),e.Q6J("ngIf","fournisseur"==n.type),e.xp6(1),e.Q6J("ngIf","identifiants_fiscaux"==n.type),e.xp6(1),e.Q6J("ngIf","contacts"==n.type))},directives:[d.O5,d.mk,l._Y,l.JL,l.F,l.Fj,l.JJ,l.On,l.Q7,l.EJ,l.YN,l.Kr,d.sg],styles:[".btn-add-contact[_ngcontent-%COMP%]{float:right}"]}),o})();const re=[{path:"",children:[{path:"page/:page",component:S,canActivate:[_.I]},{path:"edit",component:A,canActivate:[_.I]},{path:":id/edit",component:A,canActivate:[_.I]}]}];let le=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[g.Bz.forChild(re)],g.Bz]}),o})(),ae=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[d.ez,l.u5,le]]}),o})()}}]);