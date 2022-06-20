import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.sass']
})
export class ProjectNavComponent implements OnInit {
  projectId: string | null = this.route.snapshot.paramMap.get("projectId");

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
