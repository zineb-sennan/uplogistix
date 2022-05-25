import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctions } from 'src/app/_globale/global-functions';
import { SecuriteClass } from 'src/app/_globale/securite';
import { AuthService } from '../../../_services/auth.service';
import { ClientService } from '../../../_services/client.service';
import { PaysService } from '../../../_services/pays.service';
import { RegionsService } from '../../../_services/regions.service';
import { VillesService } from '../../../_services/villes.service';

@Component({
  selector: 'app-index-client',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  page=null;
  pays: any[] = []; regions: any[] = []; villes: any[] = [];
  clients:  any = { total_records: null, current_page: null, total_pages: null, records: [] };
  search:  any = { pays_id: '', region_id: '', ville_id:'', filtre:null };

  constructor(
    private securiteClass: SecuriteClass,
    public globalFunctions:GlobalFunctions,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if(this.page) this.searchClient(this.search);
      this.getAllPays();
    });
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllPays();
      });
  }

  getRegionsByPays(id: any) {
    this.regions = [];
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.villes = [];
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getRegionsByPays(id);
    });
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => this.villes = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getVillesByRegion(id);
    });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  searchClient(form:any){
    this.clientService.search(form, this.page).subscribe(
      res=>this.clients=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.searchClient(form);
    });
  }

}
