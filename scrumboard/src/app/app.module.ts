import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CdkTreeModule} from "@angular/cdk/tree";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTreeModule} from "@angular/material/tree";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {MatBadgeModule} from "@angular/material/badge";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {AddProjectDialogComponent} from './components/projects/add-project-dialog/add-project-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddMemberDialogComponent} from './components/projects/add-member-dialog/add-member-dialog.component';
import {EditProjectDialogComponent} from './components/projects/edit-project-dialog/edit-project-dialog.component';
import {
  EditProjectMembersDialogComponent
} from './components/projects/edit-project-members-dialog/edit-project-members-dialog.component';
import {
  ArchiveProjectDialogComponent
} from './components/projects/archive-project-dialog/archive-project-dialog.component';
import {ArchivedProjectsComponent} from './components/projects/archived-projects/archived-projects.component';
import {
  RestoreProjectDialogComponent
} from './components/projects/restore-project-dialog/restore-project-dialog.component';
import {BacklogComponent} from './components/project/backlog/backlog.component';
import {SprintsComponent} from './components/project/sprints/sprints.component';
import {ProjectNavComponent} from './components/project/project-nav/project-nav.component';
import { AddTaskComponent } from './components/project/backlog/modals/add-task/add-task.component';
import { AddSprintComponent } from './components/project/sprints/modals/add-sprint/add-sprint.component';
import { EditTaskComponent } from './components/project/backlog/modals/edit-task/edit-task.component';
import { ArchiveTaskDialogComponent } from './components/project/backlog/modals/archive-task/archive-task-dialog.component';
import { ArchivedBacklogComponent } from './components/project/archived-backlog/archived-backlog.component';
import { RestoreTaskDialogComponent } from './components/project/archived-backlog/modals/restore-task-dialog/restore-task-dialog.component';
import { EditSprintDialogComponent } from './components/project/sprints/modals/edit-sprint-dialog/edit-sprint-dialog.component';
import { BoardComponent } from './components/project/sprints/board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { AssignTaskDialogComponent } from './components/project/sprints/modals/assign-task-dialog/assign-task-dialog.component';
import { SetActiveDialogComponent } from './components/project/sprints/modals/set-active-dialog/set-active-dialog.component';

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProjectsComponent,
    AddProjectDialogComponent,
    AddMemberDialogComponent,
    EditProjectDialogComponent,
    EditProjectMembersDialogComponent,
    ArchiveProjectDialogComponent,
    ArchivedProjectsComponent,
    RestoreProjectDialogComponent,
    BacklogComponent,
    SprintsComponent,
    ProjectNavComponent,
    AddTaskComponent,
    AddSprintComponent,
    EditTaskComponent,
    ArchiveTaskDialogComponent,
    ArchivedBacklogComponent,
    RestoreTaskDialogComponent,
    EditSprintDialogComponent,
    BoardComponent,
    AssignTaskDialogComponent,
    SetActiveDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        materialModules,
        MatDialogModule,
        DragDropModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
