import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user/user.service";
import {SprintService} from "../../../../services/sprint/sprint.service";
import {ITask} from "../../../../models/task";
import {ISprint} from "../../../../models/sprint";
import {TaskStatus} from "../../../../enums/taskStatus";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.sass']
})
export class BurndownComponent implements OnInit {
  sprintId = this.route.snapshot.paramMap.get("sprintId");
  taskStatus = TaskStatus;
  labels: Date[] | undefined;
  tasks: ITask[] | undefined;
  sprint: ISprint | undefined;
  dates: Date[] | undefined;
  data: {}[] | undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private sprintService: SprintService, private datePipe: DatePipe) {
    if (this.sprintId != null) {
      this.sprintService.getSprintTasks(this.sprintId).subscribe(t => {
        this.tasks = t;
      });

      this.sprintService.getSprint(this.sprintId).subscribe(s => {
        this.sprint = s;
        this.generateLines(s.start_date, s.end_date, this.tasks!);
      })
    }
  }

  ngOnInit() {
  }

  generateLines(start: any, end: any, tasks: ITask[]) {
    start = new Date(start.seconds * 1000);
    end = new Date(end.seconds * 1000);
    let dates = [];
    let finishedTasks = tasks.filter(t => t.status == this.taskStatus.done);
    let ideal = {'name': 'Ideal', 'series': [{}]};
    let actual = {'name': 'Actual', 'series': [{}]};
    let result = [];

    for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      dates.push(new Date(dt));
    }

    let remainingTasks = tasks.length;
    let increment = remainingTasks / (dates.length - 1);
    let remainingIdeal = remainingTasks;
    let remainingActual = remainingTasks;

    for (let date of dates) {
      let transformedDate = this.datePipe.transform(date, 'dd-MM');

      ideal.series.push({'name': transformedDate, 'value': remainingIdeal})
      remainingIdeal -= increment;

      let completedTask = finishedTasks.filter(t => {
        let completeDate = t.updated_at as any;
        completeDate = this.datePipe.transform(new Date(completeDate.seconds * 1000), 'dd-MM');

        return completeDate == transformedDate;
      });

      remainingActual -= completedTask.length;
      actual.series.push({'name': transformedDate, 'value': remainingActual});
    }

    ideal.series.splice(0, 1);
    actual.series.splice(0, 1);
    result.push(ideal, actual);
    this.data = result;
  }
}
